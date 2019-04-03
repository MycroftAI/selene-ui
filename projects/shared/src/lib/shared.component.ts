import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-base',
  template: `
    <p>
      shared works!
    </p>
  `,
  styles: []
})
export class SharedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
