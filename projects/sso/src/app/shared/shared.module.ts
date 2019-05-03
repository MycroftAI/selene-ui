import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EmailInputComponent } from './components/email-input/email-input.component';
import { FacebookButtonComponent } from './components/facebook-button/facebook-button.component';
import { GithubButtonComponent } from './components/github-button/github-button.component';
import { GoogleButtonComponent } from './components/google-button/google-button.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';

@NgModule({
    declarations: [
        EmailInputComponent,
        FacebookButtonComponent,
        GithubButtonComponent,
        GoogleButtonComponent,
        PasswordInputComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        FontAwesomeModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    entryComponents: [],
    exports: [
        EmailInputComponent,
        FacebookButtonComponent,
        GithubButtonComponent,
        GoogleButtonComponent,
        PasswordInputComponent
    ]
})
export class SharedModule { }
