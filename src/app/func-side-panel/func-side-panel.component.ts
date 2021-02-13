import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UiStateService} from '../ui-state.service';

@Component({
  selector: 'app-func-side-panel',
  templateUrl: './func-side-panel.component.html',
  styleUrls: ['./func-side-panel.component.css']
})
export class FuncSidePanelComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  private files = [];

  fileNames = [];
  isUploadButtonDisplayed = false;


  constructor(private uiService: UiStateService) { }

  ngOnInit(): void {}

  selectFiles(fileInputEvent: any): void {
    this.files = fileInputEvent.target.files;
    this.fileNames = [];

    for (const file of this.files) {
      // @ts-ignore
      this.fileNames.push(file.name);
    }

    if (this.fileNames.length > 0) {
      this.isUploadButtonDisplayed = true;
    }
  }

  startUpload(): boolean {
    return false;
  }

  closeFuncSidePanel(): void {
    this.uiService.changeFuncSidePanelToggleState(false);
  }
}
