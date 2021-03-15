import {Component, Input, OnInit} from '@angular/core';
import {TextInputSetting} from '../../TextInputSetting';
import {MatTableDataSource} from '@angular/material/table';
import {SettingsService} from '../../../../settings.service';

@Component({
  selector: 'app-input-settings',
  templateUrl: './input-settings.component.html',
  styleUrls: ['./input-settings.component.css']
})
export class InputSettingsComponent implements OnInit {

  @Input()
  displayedColumns!: string[];

  @Input()
  dataSource!: MatTableDataSource<TextInputSetting>;

  constructor(private settingsService: SettingsService) {
    this.displayedColumns = settingsService.inputTableColumns;
  }

  ngOnInit(): void {}


}
