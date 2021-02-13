import { Component, OnInit } from '@angular/core';
import {UiStateService} from '../../ui-state.service';

@Component({
  selector: 'app-storage-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  funcSidePanelState = false;

  constructor(private uiService: UiStateService) {
  }

  ngOnInit(): void {
    this.uiService.funcSidePanelToggleStateChange$.subscribe(state => this.funcSidePanelState = state );
  }



}
