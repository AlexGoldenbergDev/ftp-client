import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { ExplorerNavNode } from './content/explorer/explorer-nav/explorer-nav.node';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ExplorerFileRow} from './content/explorer/explorer-table/explorer-table.component';

import * as AWS from 'aws-sdk';

interface FileTypeMapping {
  type: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
    this.reflectLocationArrayOnLocationChange();
    this.reflectExplorerNavNodeOnLocationChange();
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




  initAws(): void {
    AWS.config.region = 'eu-central-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-central-1:4d1dac49-a402-48bb-8018-45671c66a608',
    });
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
      this.getFilesList(FileService.convertExplorerNavNodeToLink(location)).subscribe(files => this.filesListExplorerList.next(files));
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

  getFilesList(location: string): Observable<ExplorerFileRow[]> {
    const params = new HttpParams().append('location', location);
    return this.http.get<ExplorerFileRow[]>('http://localhost:8080/explorer/files', {params});
  }
}

