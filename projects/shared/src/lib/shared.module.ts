import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FacebookButtonComponent } from './facebook-button/facebook-button.component';
import { GithubButtonComponent } from './github-button/github-button.component';
import { GoogleButtonComponent } from './google-button/google-button.component';
import { SharedComponent } from './shared.component';

@NgModule({
  declarations: [
      FacebookButtonComponent,
      GithubButtonComponent,
      GoogleButtonComponent,
      SharedComponent
  ],
  imports: [
      FontAwesomeModule,
      MatButtonModule
  ],
  exports: [
      FacebookButtonComponent,
      GithubButtonComponent,
      GoogleButtonComponent,
      SharedComponent
  ]
})
export class SharedModule { }
