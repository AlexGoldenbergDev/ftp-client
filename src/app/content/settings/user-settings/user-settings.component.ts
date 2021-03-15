import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SettingsService} from '../../../settings.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-user-settings',
  templateUrl: '../settingsTmpl.component.html',
  styleUrls: ['../serverTmpl.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UserSettingsComponent implements OnInit {


  displayedColumns: string[] = ['Categories'];
  settingTable;
  expandedElement: string | undefined;
  settings: { [index: string]: MatTableDataSource<any> };
  columns: { [index: string]: string[] };

  constructor(private settingService: SettingsService) {
    this.settings = settingService.getUserSettings();
    this.settingTable = new MatTableDataSource<string>(Object.keys(this.settings));
    this.columns = settingService.getInputTableColumns();
  }

  ngOnInit(): void {
  }

}
