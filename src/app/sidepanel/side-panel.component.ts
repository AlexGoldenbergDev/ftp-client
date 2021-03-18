import {Component, OnInit} from '@angular/core';
import {ExplorerUiStateService} from '../explorer-ui-state.service';
import {IconButtonInfo} from '../icon-button.info';

class SidePanelButton implements IconButtonInfo{
  text!: string;
  icon!: string;
  routerLink!: string;
}


@Component({
  selector: 'app-side-panel',
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

  constructor(private uiStateService: ExplorerUiStateService) {
    this.uiStateService.sidePanelToggleStateChange$
      .subscribe((sidePanelState) => this.sidePanelState = sidePanelState);
  }

  ngOnInit(): void {
    this.uiStateService.changeSidePanelToggleState(false);
  }

}
