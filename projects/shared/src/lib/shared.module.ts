import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatButtonToggleModule } from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FacebookButtonComponent } from './facebook-button/facebook-button.component';
import { GithubButtonComponent } from './github-button/github-button.component';
import { GoogleButtonComponent } from './google-button/google-button.component';
import { SharedComponent } from './shared.component';
import { MembershipOptionsComponent } from './membership-options/membership-options.component';

@NgModule({
  declarations: [
      FacebookButtonComponent,
      GithubButtonComponent,
      GoogleButtonComponent,
      MembershipOptionsComponent,
      SharedComponent
  ],
  imports: [
      CommonModule,
      FontAwesomeModule,
      MatButtonModule,
      MatButtonToggleModule
  ],
  exports: [
      FacebookButtonComponent,
      GithubButtonComponent,
      GoogleButtonComponent,
      MembershipOptionsComponent,
      SharedComponent
  ]
})
export class SharedModule { }
