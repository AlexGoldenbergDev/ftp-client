import {Component} from '@angular/core';
import {ExplorerUiStateService} from '../explorer-ui-state.service';
import {FuncSidePanelMode} from './FuncSidePanelMode';

@Component({
  selector: 'app-func-side-panel',
  templateUrl: './func-side-panel.component.html',
  styleUrls: ['./func-side-panel.component.css']
})
export class FuncSidePanelComponent {

  FuncSidePanelMode = FuncSidePanelMode;

  constructor(private uiService: ExplorerUiStateService) {}

  closeFuncSidePanel(): void {
    this.uiService.changeFuncSidePanelMode(this.getMode(), false);
  }

  getMode(): FuncSidePanelMode {
    return this.uiService.getFuncSidePanelMode();
  }

}
