import { Component, OnInit } from '@angular/core';
import { IconButtonInfo } from '../../../icon-button.info';



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

  constructor() { }

  ngOnInit(): void {
  }

}
