import {Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { DeviceAttribute } from '../../../shared/models/deviceAttribute.model';


@Component({
  selector: 'account-device-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent implements OnInit {
    @Input() currentValue: DeviceAttribute;
    @Input() instructions: string;
    @Input() panelTitle: string;
    @Input() possibleValues$: Observable<DeviceAttribute[]>;
    @Input() possibleValues: DeviceAttribute[];
    @Input() userCanAdd: boolean;
    public deleteIcon = faTrashAlt;

    constructor() {
    }

    ngOnInit() {
    }

    onCancelClick(): void {
        // this.dialogRef.close();
    }
}
