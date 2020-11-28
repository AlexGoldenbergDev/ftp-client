import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidepanel-button',
  templateUrl: './sidepanel-button.component.html',
  styleUrls: ['./sidepanel-button.component.css']
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
