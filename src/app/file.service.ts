import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { ExplorerNavNode } from './content/explorer/explorer-nav/explorer-nav.node';
import {HttpClient, HttpEvent, HttpEventType, HttpParams} from '@angular/common/http';
import {ExplorerFileRow} from './content/explorer/explorer-table/explorer-table.component';

import {LocalStorageService} from './local-storage.service';

interface FileTypeMapping {
  type: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private locationPath: string;
  private selectedFiles: ExplorerFileRow[] = [];

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
  private selectedFilesListExplorerList = new Subject<ExplorerFileRow[]>();

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
      this.selectedFiles = [];
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
    this.selectedFilesListExplorerList.next(this.selectedFiles);
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
      reportProgress: true
    });

    observable.subscribe((event: HttpEvent<ExplorerFileRow[]>) => {
        if (event.type === HttpEventType.Response) {
          // @ts-ignore
          const body: ExplorerFileRow[] = event.body;
          this.filesListExplorerList.next(body);
          this.selectedFiles = [];
          this.triggerSelectedFilesChange();
        }
    });

    return observable;
  }

  createFolder(name: string): void {
    const params = {location: this.locationPath, name};
    this.http.put<ExplorerFileRow[]>( this.getServerAddress() + 'folder', params).subscribe(files => {
      this.filesListExplorerList.next(files);
      this.selectedFiles = [];
      this.triggerSelectedFilesChange();
    });
  }

  delete(name: string): void {
    const params = new HttpParams()
      .append('location', this.locationPath)
      .append('name', name);
    this.http.delete<ExplorerFileRow[]>( this.getServerAddress() + 'delete', {params}).subscribe(files => {
      this.filesListExplorerList.next(files);
      this.selectedFiles = [];
      this.triggerSelectedFilesChange();
    });
  }

  getServerAddress(): string {
    return 'http://' + this.address + ':' + this.port + '/explorer/';
  }

  selectFile(element: ExplorerFileRow): void {
    this.selectedFiles.push(element);
    this.triggerSelectedFilesChange();
  }

  unselectFile(element: ExplorerFileRow): void {
    const index = this.selectedFiles.indexOf(element);
    if (index > -1) {
      this.selectedFiles.splice(index, 1);
      this.triggerSelectedFilesChange();
    }
  }
}

