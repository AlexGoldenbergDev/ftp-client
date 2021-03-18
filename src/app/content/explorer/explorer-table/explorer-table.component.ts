import {Component, OnInit} from '@angular/core';
import { FileService } from '../../../file.service';
import {Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ExplorerNavNode} from '../explorer-nav/explorer-nav.node';

export interface ExplorerFileRow {
  name: string;
  size: number;
  owner: string;
  type: string;
  isSelected: boolean;
}


@Component({
  selector: 'app-explorer-table',
  templateUrl: './explorer-table.component.html',
  styleUrls: ['./explorer-table.component.css']
})
export class ExplorerTableComponent implements OnInit {


  location: ExplorerNavNode = new ExplorerNavNode('/', '/', undefined);

  displayedColumns: string[] = ['selection', 'name', 'type', 'size'];
  displayedFooterColumns: string[] = ['name', 'size'];
  measures: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  sort!: Sort;
  sortedDataSource = new MatTableDataSource<ExplorerFileRow>();
  private initialFilesArray: ExplorerFileRow[] = [];

  constructor(private fileService: FileService) {
    this.fileService.fileExplorerLocationChange$.subscribe(location => this.location = location);
    this.fileService.filesListExplorerListChange$.subscribe(files => {
      this.initialFilesArray = files;
      this.triggerSorting();
    });
  }

  ngOnInit(): void {}

  getIconName(fileType: string): string {
    return this.fileService.getIconName(fileType);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sortedDataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotalSize(): string {
    const size = this.sortedDataSource.data.map(file => file.size).reduce((acc, value) => acc + value, 0);
    return this.measureUp(this.measures, 0, size);
  }

  changeLocationDown(file: ExplorerFileRow): void {
    let node = this.location;
    while (node.child) {
      node = node.child;
    }
    node.child = new ExplorerNavNode(file.name, '/' + file.name, undefined);
    this.fileService.changeExplorerLocation(this.location);
  }


  isSelected(file: ExplorerFileRow): boolean {
    return this.fileService.isSelected(file);
  }


  isAllSelected(): boolean {
    return this.fileService.isAllSelected(this.sortedDataSource);
  }


  toggle(file: ExplorerFileRow): void {
    this.fileService.toggle(file);
  }

  masterToggle(): void {
    this.fileService.masterToggle(this.sortedDataSource);
  }

  hasValue(): boolean {
    return this.fileService.hasValue();
  }

  sortData(sort: Sort): void {
    this.sort = sort;
    this.triggerSorting();
  }

  private triggerSorting(): void {
    if (!this.sort || !this.sort.direction) {
      this.sortedDataSource.data = this.initialFilesArray.slice();
    }
    else {
      this.sortedDataSource = new MatTableDataSource(this.sortedDataSource.data.sort((a: ExplorerFileRow, b: ExplorerFileRow) => {
          const isAsc = this.sort.direction === 'asc';
          switch (this.sort.active) {
            case 'name' : return this.compare(a.name, b.name,   isAsc);
            case 'type' : return this.compare(a.type, b.type,   isAsc);
            case 'size' : return this.compare(a.size, b.size,   isAsc);
            default: return 0;
          }
        })
      );
    }
  }

  compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getSize(size: number): string {
    return this.measureUp(this.measures, 0, size);
  }

  measureUp(measures: string[], index: number, size: number): string {
    let r;

    if (!size) {
      r = '';
    }
    else if (size > 999 && index !== measures.length - 1) {
      r = this.measureUp(measures, index + 1, size / 1000);
    }
    else {
      r = size.toFixed(1) + ' ' + measures[index];
    }

    return r;
  }

}
