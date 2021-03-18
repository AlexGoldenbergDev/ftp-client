import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { ExplorerNavNode } from './content/explorer/explorer-nav/explorer-nav.node';
import {HttpClient, HttpEvent, HttpEventType, HttpParams} from '@angular/common/http';
import {ExplorerFileRow} from './content/explorer/explorer-table/explorer-table.component';

import {LocalStorageService} from './local-storage.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

interface FileTypeMapping {
  type: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private locationPath: string;
  selection = new SelectionModel<ExplorerFileRow>(true, []);

  private address: string;
  private port: string;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.locationPath = '/';
    this.reflectLocationArrayOnLocationChange();
    this.reflectExplorerNavNodeOnLocationChange();

    this.address = this.localStorageService.getServerAddress();
    this.localStorageService.serverAddressChange$.subscribe(address => this.address = address);

    this.port = this.localStorageService.getServerPort();
    this.localStorageService.serverPortChange$.subscribe(port => this.port = port);
  }

  mapping: FileTypeMapping[] = [
    {
      type: 'folder',
      image: 'folder'
    },
    {
      type: 'file',
      image: 'insert_drive_file'
    },
    {
      type: 'image',
      image: 'image'
    },
    {
      type: 'video',
      image: 'movie_creation'
    },
    {
      type: 'text',
      image: 'description'
    }
  ];

  private fileExplorerLocation = new Subject<ExplorerNavNode>();
  private fileExplorerLocationArray = new Subject<string[]>();
  private filesListExplorerList = new Subject<ExplorerFileRow[]>();
  private selectedFilesListExplorerList = new Subject<SelectionModel<ExplorerFileRow>>();

  fileExplorerLocationChange$ = this.fileExplorerLocation.asObservable();
  fileExplorerLocationArrayChange$ = this.fileExplorerLocationArray.asObservable();
  filesListExplorerListChange$ = this.filesListExplorerList.asObservable();
  selectedFilesListExplorerChange$ = this.selectedFilesListExplorerList.asObservable();

  private static convertExplorerNavNodeToLink(node: ExplorerNavNode): string {
    let link = node.link;
    let iterNode = node.child;
    while (iterNode) {
      link = link.concat(iterNode.link);
      iterNode = iterNode.child;
    }
    return link;
  }


  private reflectLocationArrayOnLocationChange(): void {
    this.fileExplorerLocationChange$.subscribe(location => {
      const names: Array<string> = [];
      let node: ExplorerNavNode | undefined = location;
      while (node) {
        names.push(node.name);
        node = node.child;
      }
      this.fileExplorerLocationArray.next(names);
      this.clearSelection();
      this.triggerSelectedFilesChange();
    });
  }

  private reflectExplorerNavNodeOnLocationChange(): void {
    this.fileExplorerLocationChange$.subscribe(location => {
      this.locationPath = FileService.convertExplorerNavNodeToLink(location);
      this.getFilesList().subscribe(files => this.filesListExplorerList.next(files));
    });
  }

  private triggerSelectedFilesChange(): void {
    this.selectedFilesListExplorerList.next(this.selection);
  }

  getIconName(fileType: string): string {
    for (const product of this.mapping) {
      if (product.type === fileType) { return product.image; }
    }
    return 'file';
  }

  changeExplorerLocation(location: ExplorerNavNode): void {
    this.fileExplorerLocation.next(location);
  }

  getFilesList(): Observable<ExplorerFileRow[]> {
    const params = new HttpParams().append('location', this.locationPath);
    return this.http.get<ExplorerFileRow[]>( this.getServerAddress() + 'files', {params, withCredentials: true});
  }

  upload(file: File): Observable<HttpEvent<ExplorerFileRow[]>>{
    const formData = new FormData();
    formData.append('location', this.locationPath);
    formData.append('file', file);

    const observable = this.http.post<ExplorerFileRow[]>( this.getServerAddress() + 'upload', formData, {
      observe: 'events',
      reportProgress: true,
      withCredentials: true
    });

    observable.subscribe((event: HttpEvent<ExplorerFileRow[]>) => {
        if (event.type === HttpEventType.Response) {
          // @ts-ignore
          const body: ExplorerFileRow[] = event.body;
          this.filesListExplorerList.next(body);
          this.clearSelection();
          this.triggerSelectedFilesChange();
        }
    });

    return observable;
  }

  createFolder(name: string): void {
    const params = {location: this.locationPath, name};
    this.http.put<ExplorerFileRow[]>( this.getServerAddress() + 'folder', params, {withCredentials: true}).subscribe(files => {
      this.filesListExplorerList.next(files);
      this.clearSelection();
      this.triggerSelectedFilesChange();
    });
  }

  delete(name: string): void {
    const params = new HttpParams()
      .append('location', this.locationPath)
      .append('name', name);
    this.http.delete<ExplorerFileRow[]>( this.getServerAddress() + 'delete', {params, withCredentials: true}).subscribe(files => {
      this.filesListExplorerList.next(files);
      this.clearSelection();
      this.triggerSelectedFilesChange();
    });
  }

  download(): void {
    this.selection.selected.forEach(file => {
      const params = new HttpParams()
        .append('location', this.locationPath)
        .append('name', file.name);
      this.http.get<string>( this.getServerAddress() + 'download', {params, withCredentials: true}).subscribe(link => window.open(link));
    });

  }

  getServerAddress(): string {
    return 'http://' + this.address + ':' + this.port + '/explorer/';
  }



  isSelected(file: ExplorerFileRow): boolean {
    return this.selection.isSelected(file);
  }


  isAllSelected(dataSource: MatTableDataSource<ExplorerFileRow>): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = dataSource.data.length;
    return numSelected === numRows;
  }


  toggle(file: ExplorerFileRow): void {
    this.selection.toggle(file);
    this.triggerSelectedFilesChange();
  }

  masterToggle(dataSource: MatTableDataSource<ExplorerFileRow>): void {
    this.isAllSelected(dataSource) ?
      this.clearSelection() :
      dataSource.data.forEach(row => this.selection.select(row));
    this.triggerSelectedFilesChange();
  }

  hasValue(): boolean {
    return this.selection.hasValue();
  }

  clearSelection(): void {
    this.selection.clear();
  }

  select(row: ExplorerFileRow): void {
    this.selection.select(row);
    this.triggerSelectedFilesChange();
  }
}

