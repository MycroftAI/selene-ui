import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { faEnvelopeCircleCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { environment } from '@account/environments/environment';
import { ProfileService } from '@account/http/profile.service';

@Component({
  selector: 'account-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
    public emailAddressIcon: IconDefinition = faEnvelopeCircleCheck;
    public emailVerified: boolean;
    public verificationMessage: string;

    constructor(
        private route: ActivatedRoute,
        private profileService: ProfileService,
        private router: Router
    ) { }

    ngOnInit(): void {
        const resetToken = this.route.snapshot.queryParams['token'];
        this.profileService.verifyEmailAddress(resetToken).subscribe({
            next: () => {
                this.verificationMessage = 'Thank you for verifying your new email address.  Use it the next time you login.';
                this.emailVerified = true;
            },
            error: (error) => {
                if (error.status === 401) {
                    this.verificationMessage = 'Your need to be logged in to verify your email address.  ' +
                        'The new email address has not yet been applied to your account so login using the email address being replaced.';
                    this.emailVerified = false;
                }
            }
        });
    }

    loginToAccount(): void {
        window.location.href = environment.mycroftUrls.singleSignOn + '/login?redirect=' + window.location.href;
    }

    navigateToDashboard(): void {
        this.router.navigate(['/']);
    }
}
