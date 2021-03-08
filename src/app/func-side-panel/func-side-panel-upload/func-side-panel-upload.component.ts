import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-func-side-panel-upload',
  templateUrl: './func-side-panel-upload.component.html',
  styleUrls: ['./func-side-panel-upload.component.css']
})
export class FuncSidePanelUploadComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  @ViewChild('tickets')
  tickets!: ElementRef[];

  files: File[] = [];
  fileNames = [];
  isUploadButtonDisabled = true;

  constructor() { }

  ngOnInit(): void {
  }

  selectFiles(fileInputEvent: any): void {
    this.files = fileInputEvent.target.files;

    if (this.files.length > 0) {
      this.isUploadButtonDisabled = false;
    }
  }

  startUpload(): void {
    for (const ticket of this.tickets) {
      ticket.nativeElement.upload();
    }
  }

}
