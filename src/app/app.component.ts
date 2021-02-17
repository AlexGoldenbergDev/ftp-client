import { Component } from '@angular/core';
import {ExplorerUiStateService} from './explorer-ui-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ftp-client';

  sidePanelState = false;

  constructor(private uiService: ExplorerUiStateService) {
    uiService.sidePanelToggleStateChange$.subscribe((state) => this.sidePanelState = state);
  }
}
