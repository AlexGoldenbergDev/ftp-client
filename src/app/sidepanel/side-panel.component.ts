import { Component, OnInit } from '@angular/core';
import { UiStateService } from '../ui-state.service';

class SidePanelButton {
  text!: string;
  icon!: string;
}


@Component({
  selector: 'app-sidepanel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {


  buttons: SidePanelButton[] = [
    {
      text: 'Dashboard',
      icon: 'dashboard'
    },
    {
      text: 'Explorer',
      icon: 'explore'
    }
    ,
    {
      text: 'Settings',
      icon: 'settings'
    }
  ];

  sidePanelState = false;

  constructor(private uiStateService: UiStateService) {
    this.uiStateService.sidePanelToggleStateChange$
      .subscribe((sidePanelState) => this.sidePanelState = sidePanelState);
  }

  ngOnInit(): void {
    this.uiStateService.changeSidePanelToggleState(false);
  }

}
