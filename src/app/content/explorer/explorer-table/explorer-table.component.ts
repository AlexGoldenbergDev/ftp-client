import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FileService } from '../../../file.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface ExplorerFileRow {
  name: string;
  size: number;
  owner: string;
  type: string;
  isSelected: boolean;
}

const ELEMENT_DATA: ExplorerFileRow[] = [

  {name: 'folder1', size: 10079, owner: 'Alex', type: 'folder', isSelected: false},
  {name: 'folder2', size: 40026, owner: 'Alex', type: 'folder', isSelected: false},
  {name: 'textFile1', size: 6941, owner: 'Alex', type: 'text', isSelected: false},
  {name: 'textFile2', size: 90122, owner: 'Alex', type: 'text', isSelected: false},
  {name: 'folder3', size: 10811, owner: 'Alex', type: 'folder', isSelected: false},
  {name: 'image1', size: 120107, owner: 'Alex', type: 'image', isSelected: false},
  {name: 'image2', size: 140067, owner: 'Alex', type: 'image', isSelected: false},
  {name: 'video1', size: 159994, owner: 'Alex', type: 'video', isSelected: false},
  {name: 'file1', size: 189984, owner: 'Alex', type: 'file', isSelected: false},

  {name: 'ывс', size: 10079, owner: 'Alex', type: 'folder', isSelected: false},
  {name: 'הגדה', size: 40026, owner: 'Alex', type: 'folder', isSelected: false},
  {name: 'dcds', size: 6941, owner: 'Alex', type: 'text', isSelected: false},
  {name: 'vd', size: 90122, owner: 'Alex', type: 'text', isSelected: false},
  {name: 'vdv', size: 10811, owner: 'Alex', type: 'folder', isSelected: false},
  {name: 'vdsvsd', size: 120107, owner: 'Alex', type: 'image', isSelected: false},
  {name: 'vdsvsd', size: 140067, owner: 'Alex', type: 'image', isSelected: false},
  {name: 'vsdvs', size: 159994, owner: 'Alex', type: 'video', isSelected: false},
  {name: 'muiiu', size: 189984, owner: 'Alex', type: 'file', isSelected: false},
  {name: 'fipple2', size: 201797, owner: 'Alex',  type: 'file', isSelected: false}
];


@Component({
  selector: 'app-explorer-table',
  templateUrl: './explorer-table.component.html',
  styleUrls: ['./explorer-table.component.css']
})
export class ExplorerTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['selection', 'name', 'type', 'owner', 'size'];
  displayedFooterColumns: string[] = ['name', 'size'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getIconName(fileType: string): string {
    return this.fileService.getIconName(fileType);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotalSize(): number {
    return ELEMENT_DATA.map(file => file.size).reduce((acc, value) => acc + value, 0);
  }
}
