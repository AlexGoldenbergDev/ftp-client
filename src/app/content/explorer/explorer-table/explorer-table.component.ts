import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FileService } from '../../../file.service';
import {MatSort} from '@angular/material/sort';
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
export class ExplorerTableComponent implements OnInit, AfterViewInit {

  location: ExplorerNavNode = new ExplorerNavNode('/', '/', undefined);

  displayedColumns: string[] = ['selection', 'name', 'type', 'owner', 'size'];
  displayedFooterColumns: string[] = ['name', 'size'];

  dataSource = new MatTableDataSource<ExplorerFileRow>();

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fileService: FileService) {
    this.fileService.filesListExplorerListChange$.subscribe(files => this.dataSource = new MatTableDataSource(files));
    this.fileService.fileExplorerLocationChange$.subscribe(location => this.location = location);
  }

  ngOnInit(): void {}


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
    return this.dataSource.data.map(file => file.size).reduce((acc, value) => acc + value, 0);
  }

  changeLocationDown(file: ExplorerFileRow): void {
    let node = this.location;
    while (node.child) {
      node = node.child;
    }
    node.child = new ExplorerNavNode(file.name, '/' + file.name, undefined);
    this.fileService.changeExplorerLocation(this.location);
  }

  selectFile(element: ExplorerFileRow): void {
    const selected = element.isSelected;
    if (selected) {
      this.fileService.selectFile(element);
    }
    else {
      this.fileService.unselectFile(element);
    }
  }
}
