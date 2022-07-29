import { Component, OnInit } from '@angular/core';

import { faComments, faEarthAmericas, faEnvelope, faGauge, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'account-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
    public dataPresentationIcon = faGauge;
    public emailAddressIcon = faEnvelope;
    public locationIcon = faEarthAmericas;
    public queryIcon = faQuestionCircle;
    public voiceIcon = faComments;

  constructor() { }

  ngOnInit(): void {
  }

}
