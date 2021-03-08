import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileService} from '../../file.service';

@Component({
  selector: 'app-func-side-panel-create-folder',
  templateUrl: './func-side-panel-create-folder.component.html',
  styleUrls: ['./func-side-panel-create-folder.component.css']
})
export class FuncSidePanelCreateFolderComponent implements OnInit {

  @ViewChild('input')
  input!: ElementRef;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }

  createFolder(): void {
    this.fileService.createFolder(this.input.nativeElement.value);
  }

  checkIfInputEmpty(): boolean {
    if (!this.input) { return true; }
    const value: string = this.input.nativeElement.value;
    return !value || value.length < 1;
  }
}
