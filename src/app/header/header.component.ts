import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UiStateService} from '../ui-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  toggleSidebarEvent = new EventEmitter();

  sidePanelState = false;

  constructor(private uiStateService: UiStateService) {
    uiStateService.sidePanelToggleStateChange$
      .subscribe((sidePanelState) => this.sidePanelState = sidePanelState);
  }

  ngOnInit(): void {
  }

  toggleSidePanel(): void {
    this.uiStateService.changeSidePanelToggleState(!this.sidePanelState);
  }

}
