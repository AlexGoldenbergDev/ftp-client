import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-panel-button',
  templateUrl: './side-panel-button.component.html',
  styleUrls: ['./side-panel-button.component.css']
})
export class SidePanelButtonComponent implements OnInit {

  @Input()
  text!: string;

  @Input()
  iconName!: string;

  @Input()
  routerLink!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
