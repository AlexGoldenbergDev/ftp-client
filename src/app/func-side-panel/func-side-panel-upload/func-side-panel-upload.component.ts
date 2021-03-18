import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FuncSidePanelFileTicketComponent} from '../func-side-panel-file-ticket/func-side-panel-file-ticket.component';

@Component({
  selector: 'app-func-side-panel-upload',
  templateUrl: './func-side-panel-upload.component.html',
  styleUrls: ['./func-side-panel-upload.component.css']
})
export class FuncSidePanelUploadComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  @ViewChild('tickets')
  tickets: FuncSidePanelFileTicketComponent[] = [];

  files: File[] = [];
  fileNames = [];
  isUploadButtonDisabled = true;

  constructor() { }

  ngOnInit(): void {
  }

  selectFiles(fileInputEvent: any): void {
    this.tickets = [];
    this.files = fileInputEvent.target.files;

    if (this.files.length > 0) {
      this.isUploadButtonDisabled = false;
    }
  }

  startUpload(): void {
    for (const ticket of this.tickets) {
      ticket.upload();
    }
  }

  addFile(ticket: FuncSidePanelFileTicketComponent): number {
    const index = this.tickets.indexOf(ticket);
    return (index === -1) ? this.tickets.push(ticket) : index;
  }
}
