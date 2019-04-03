import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'account-device-add-complete',
  templateUrl: './add-complete.component.html',
  styleUrls: ['./add-complete.component.scss']
})
export class AddCompleteComponent implements OnInit {
    @Input() wakeWord: string;

  constructor() { }

  ngOnInit() {
  }

}
