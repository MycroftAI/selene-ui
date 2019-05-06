import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AccountDefaults } from '@account/models/defaults.model';

@Component({
    selector: 'account-defaults',
    templateUrl: './defaults.component.html',
    styleUrls: ['./defaults.component.scss']
})
export class DefaultsComponent implements OnInit {
    public defaults: AccountDefaults;
    public defaultsForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(
            (data: {defaults: AccountDefaults}) => { this.defaults = data.defaults; }
        );
        this.defaultsForm = this.formBuilder.group(
            {
                city: [this.defaults ? this.defaults.city.name : null],
                country: [this.defaults ? this.defaults.country.name : null],
                region: [this.defaults ? this.defaults.region.name : null],
                timezone: [this.defaults ? this.defaults.timezone.name : null],
                wakeWord: [this.defaults ? this.defaults.wakeWord.displayName : null],
                voice: [this.defaults ? this.defaults.voice.displayName : null]
            }
        );

    }

}
