import { Component, OnInit, ViewChild } from '@angular/core';
import {
    AbstractControl,
    AsyncValidatorFn,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { ApiService } from '../../core/http/api.service';
import { AuthenticationStepComponent } from './authentication-step/authentication-step.component';
import { environment } from '@account/environments/environment';
import { LoginToken } from '../../shared/models/login-token.model';
import { SnackbarComponent } from 'shared';


export function loginValidator(): ValidatorFn {
    return (loginGroup: FormGroup) => {
        let valid = true;
        const federatedToken = loginGroup.controls['federatedToken'];
        const email  = loginGroup.controls['email'];
        const password = loginGroup.controls['password'];

        if (federatedToken.value) {
            if (email.value || password.value) {
                valid = false;
            }
        } else {
            if (!email.value || !password.value) {
                valid = false;
            }
        }
        return valid ? null : {loginInvalid: true};
    };
}


export function uniqueEmailValidator(apiService: ApiService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        let loginToken: LoginToken;
        if (control.value) {
            loginToken = {platform: 'Internal', token: btoa(control.value)};
        } else {
            loginToken = {platform: 'Internal', token: ''};
        }
        return apiService.validateEmailAddress(loginToken).pipe(
            map((response) => response.accountExists ? { duplicateEmail: true } : null),
            catchError(() =>  null),
        );
    };
}



@Component({
  selector: 'sso-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {
    @ViewChild(AuthenticationStepComponent) authenticationStep: AuthenticationStepComponent;
    public alignVertical: boolean;
    public loginForm: FormGroup;
    private mediaWatcher: Subscription;
    public newAcctForm: FormGroup;
    public stepDoneIcon = faCheck;

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        public mediaObserver: MediaObserver,
        private snackbar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.mediaWatcher = mediaObserver.media$.subscribe(
            (change: MediaChange) => {
                this.alignVertical = ['xs', 'sm'].includes(change.mqAlias);
            }
        );
    }

    ngOnInit() {
        this.buildForm();
        this.route.queryParams.subscribe(
            (params) => { this.evaluateQueryParams(params); }
        );
    }

    buildForm() {
        // As of this writing there is an issue with using "update on blur" using the form builder.
        // Building the email control separately as a workaround.
        const emailControl = new FormControl(
            null,
            {
                validators: [Validators.email],
                asyncValidators: [uniqueEmailValidator(this.apiService)],
                updateOn: 'blur'
            }
        );
        this.loginForm = this.formBuilder.group(
            {
                federatedPlatform: [null],
                federatedToken: [null],
                email: emailControl,
                password: [null]
            },
            {validator: loginValidator()}
        );
        this.newAcctForm = this.formBuilder.group({
            privacyPolicy: [false, Validators.requiredTrue],
            termsOfUse: [false, Validators.requiredTrue],
            login: this.loginForm,
        });
    }

    /**
     * The GitHib login button redirects to this page while it is going through the
     * authentication process.  When it does, it sets query parameters that are used
     * to facilitate the user authentication.
     *
     * @param queryParams: set by the GitHub authentication process
     */
    evaluateQueryParams(queryParams: any) {
        if (queryParams.code) {
            this.apiService.getGithubToken(queryParams.code, queryParams.state).subscribe(
                (response) => { this.validateGithubUser(response.token); }
            );
        }
    }

    validateGithubUser(oauthToken: string) {
        console.log(oauthToken);
        const loginValidation: LoginToken = {platform: 'GitHub', token: oauthToken};
        this.authenticationStep.onFederatedLogin(loginValidation);
    }

    onFormSubmit() {
        if (this.newAcctForm.valid) {
            this.openAddAccountSnackbar();
            this.apiService.addAccount(this.newAcctForm).subscribe(
                () => { this.openSuccessSnackbar(); },
                () => { this.openErrorSnackbar(); }
            );
        }
    }

    openErrorSnackbar() {
        const config = new MatSnackBarConfig();
        config.data = {type: 'error', message: 'An error occurred, account not added.'};
        this.snackbar.openFromComponent(SnackbarComponent, config);
    }

    openSuccessSnackbar() {
        const config = new MatSnackBarConfig();
        config.duration = 1000;
        config.data = {type: 'success', message: 'Success!'};
        const successSnackbar = this.snackbar.openFromComponent(SnackbarComponent, config);
        const navigationExtras: NavigationExtras = {
            queryParams: {redirect: environment.mycroftUrls.account + '/new'}
        };

        successSnackbar.afterDismissed().subscribe(
            () => { this.router.navigate(['/login'], navigationExtras); }
        );
    }

    openAddAccountSnackbar() {
        const config = new MatSnackBarConfig();
        config.data = {type: 'progress', message: 'Adding you to our community...'};
        this.snackbar.openFromComponent(SnackbarComponent, config);
    }

}
