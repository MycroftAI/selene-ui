import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'account-device-edit-card',
    templateUrl: './device-edit-card.component.html',
    styleUrls: ['./device-edit-card.component.scss']
})
export class DeviceEditCardComponent implements OnInit {
    @Input() deviceForm: FormGroup;
    @Input() addDevice = false;
    @Output() saveChanges = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onSave() {
      this.saveChanges.emit(true);
  }

  onCancel() {
      this.saveChanges.emit(false);
  }
}
