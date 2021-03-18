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

  @ViewChild(MatSort) sort!: MatSort;

  location: ExplorerNavNode = new ExplorerNavNode('/', '/', undefined);

  displayedColumns: string[] = ['selection', 'name', 'type', 'owner', 'size'];
  displayedFooterColumns: string[] = ['name', 'size'];

  dataSource = new MatTableDataSource<ExplorerFileRow>();



  constructor(private fileService: FileService) {
    this.fileService.fileExplorerLocationChange$.subscribe(location => this.location = location);
    this.fileService.filesListExplorerListChange$.subscribe(files => {
      this.dataSource = new MatTableDataSource(files);
    });
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


  isSelected(file: ExplorerFileRow): boolean {
    return this.fileService.isSelected(file);
  }


  isAllSelected(): boolean {
    return this.fileService.isAllSelected(this.dataSource);
  }


  toggle(file: ExplorerFileRow): void {
    this.fileService.toggle(file);
  }

  masterToggle(): void {
    this.fileService.masterToggle(this.dataSource);
  }

  hasValue(): boolean {
    return this.fileService.hasValue();
  }
}
