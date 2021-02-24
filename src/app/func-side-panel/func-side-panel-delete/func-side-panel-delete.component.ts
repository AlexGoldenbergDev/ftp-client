import { Component, OnInit } from '@angular/core';
import {FileService} from '../../file.service';

@Component({
  selector: 'app-func-side-panel-delete',
  templateUrl: './func-side-panel-delete.component.html',
  styleUrls: ['./func-side-panel-delete.component.css']
})
export class FuncSidePanelDeleteComponent implements OnInit {
  fileNames = ['1', '2', '3', '4', '5'];

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.fileService.delete();
  }
}
