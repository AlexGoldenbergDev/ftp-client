import {Component, OnInit} from '@angular/core';
import {UiStateService} from '../ui-state.service';
import {IconButtonInfo} from '../icon-button.info';

class SidePanelButton implements IconButtonInfo{
  text!: string;
  icon!: string;
  routerLink!: string;
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
      icon: 'dashboard',
      routerLink: 'dashboard'

    },
    {
      text: 'Explorer',
      icon: 'explore',
      routerLink: 'explorer'
    }
    ,
    {
      text: 'Settings',
      icon: 'settings',
      routerLink: 'settings'
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
