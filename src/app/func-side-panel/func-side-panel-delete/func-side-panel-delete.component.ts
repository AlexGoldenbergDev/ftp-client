import { Component, OnInit } from '@angular/core';
import {FileService} from '../../file.service';
import {ExplorerFileRow} from '../../content/explorer/explorer-table/explorer-table.component';

@Component({
  selector: 'app-func-side-panel-delete',
  templateUrl: './func-side-panel-delete.component.html',
  styleUrls: ['./func-side-panel-delete.component.css']
})
export class FuncSidePanelDeleteComponent implements OnInit {
  fileNames = ['1', '2', '3', '4', '5'];
  filesToDelete: ExplorerFileRow[] = [];

  constructor(private fileService: FileService) {
    this.fileService.selectedFilesListExplorerChange$.subscribe(selected => this.filesToDelete = selected);
  }

  ngOnInit(): void {

  }

  delete(): void {
    this.filesToDelete.forEach(file => this.fileService.delete(file.name));
  }
}
