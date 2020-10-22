import { Component } from '@angular/core';

import { environment } from '../environments/environment';

@Component({
  selector: 'precise-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public environment = environment;
    title = 'Precise';
}
