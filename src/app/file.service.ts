import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { ExplorerNavNode } from './content/explorer/explorer-nav/explorer-nav.node';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  fileExplorerLocationChange$ = this.fileExplorerLocation.asObservable();
  fileExplorerLocationArrayChange$ = this.fileExplorerLocationArray.asObservable();
  filesListExplorerListChange$ = this.filesListExplorerList.asObservable();

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
    });
  }

  private reflectExplorerNavNodeOnLocationChange(): void {
    this.fileExplorerLocationChange$.subscribe(location => {
      this.locationPath = FileService.convertExplorerNavNodeToLink(location);
      this.getFilesList().subscribe(files => this.filesListExplorerList.next(files));
    });
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
    return this.http.get<ExplorerFileRow[]>( this.getServerAddress() + 'files', {params});
  }

  upload(file: File): Observable<ExplorerFileRow[]> {
    const params = {location: this.locationPath, file};
    return this.http.post<ExplorerFileRow[]>( this.getServerAddress() + 'upload', params);
  }

  createFolder(name: string): Observable<ExplorerFileRow[]> {
    const params = {location: this.locationPath, name};
    return this.http.put<ExplorerFileRow[]>( this.getServerAddress() + 'folder', params);
  }

  delete(name: string): Observable<ExplorerFileRow[]> {
    const params = new HttpParams()
      .append('location', this.locationPath)
      .append('name', name);
    return this.http.delete<ExplorerFileRow[]>( this.getServerAddress() + 'delete', {params});
  }

  getServerAddress(): string {
    return 'http://' + this.address + ':' + this.port + '/explorer/';
  }
}

