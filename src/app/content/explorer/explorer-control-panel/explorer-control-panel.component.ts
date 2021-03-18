import {Component, OnInit} from '@angular/core';
import {IconButtonInfo} from '../../../icon-button.info';
import {ExplorerUiStateService} from '../../../explorer-ui-state.service';
import {FuncSidePanelMode} from '../../../func-side-panel/FuncSidePanelMode';
import {FileService} from '../../../file.service';


@Component({
  selector: 'app-explorer-control-panel',
  templateUrl: './explorer-control-panel.component.html',
  styleUrls: ['./explorer-control-panel.component.css']
})
export class ExplorerControlPanelComponent implements OnInit {

  buttons: IconButtonInfo[] = [
    {
      text: 'Create Folder',
      icon: 'create_new_folder'
    },
    {
      text: 'Upload',
      icon: 'cloud_upload'
    },
    {
      text: 'Download',
      icon: 'cloud_download'
    },
    {
      text: 'Delete',
      icon: 'delete'
    }
  ];

  private funcSidePanelState = false;

  constructor(private uiService: ExplorerUiStateService, private fileService: FileService) {
    this.uiService.funcSidePanelToggleStateChange$.subscribe(state => this.funcSidePanelState = state);
  }

  ngOnInit(): void {
  }
  toggleUpload(): void {
    this.uiService.changeFuncSidePanelMode(FuncSidePanelMode.Upload, !this.funcSidePanelState);
  }

  toggleCreateFolder(): void {
    this.uiService.changeFuncSidePanelMode(FuncSidePanelMode.Create_Folder, !this.funcSidePanelState);
  }

  toggleDelete(): void {
    this.uiService.changeFuncSidePanelMode(FuncSidePanelMode.Delete, !this.funcSidePanelState);
  }

  download(): void {
    this.fileService.download();
  }
}
