import {Component, Input, OnInit} from '@angular/core';
import {FileService} from '../../file.service';
import {HttpEvent, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-func-side-panel-file-ticket',
  templateUrl: './func-side-panel-file-ticket.component.html',
  styleUrls: ['./func-side-panel-file-ticket.component.css']
})
export class FuncSidePanelFileTicketComponent implements OnInit {


  @Input()
  type = 'file';

  @Input()
  file!: File;

  value = 0;
  icon = 'description';

  constructor(private fileService: FileService) { }

  ngOnInit(): void {}

  upload(): void {
    this.fileService.upload(this.file).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          // @ts-ignore
          this.value = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.value = 100;
      }
    });
  }

}
