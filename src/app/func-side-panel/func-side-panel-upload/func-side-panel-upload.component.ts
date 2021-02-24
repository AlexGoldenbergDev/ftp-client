import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-func-side-panel-upload',
  templateUrl: './func-side-panel-upload.component.html',
  styleUrls: ['./func-side-panel-upload.component.css']
})
export class FuncSidePanelUploadComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  private files = [];
  fileNames = [];
  isUploadButtonDisabled = true;

  constructor() { }

  ngOnInit(): void {
  }

  selectFiles(fileInputEvent: any): void {
    this.files = fileInputEvent.target.files;
    this.fileNames = [];

    for (const file of this.files) {
      // @ts-ignore
      this.fileNames.push(file.name);
    }

    if (this.fileNames.length > 0) {
      this.isUploadButtonDisabled = false;
    }
  }

  startUpload(): boolean {
    return false;
  }

}
