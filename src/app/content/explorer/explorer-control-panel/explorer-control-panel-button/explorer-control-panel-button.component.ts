import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-explorer-control-panel-button',
  templateUrl: './explorer-control-panel-button.component.html',
  styleUrls: ['./explorer-control-panel-button.component.css']
})
export class ExplorerControlPanelButtonComponent implements OnInit {

  @Input()
  text!: string;

  @Input()
  icon!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
