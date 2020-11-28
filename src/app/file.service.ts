import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { ExplorerNavNode } from './content/explorer/explorer-nav/explorer-nav.node';

interface FileTypeMapping {
  type: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private fileExplorerLocation = new Subject<ExplorerNavNode>();
  private fileExplorerLocationArray = new Subject<string[]>();

  // @ts-ignore
  fileExplorerLocationChange$ = this.fileExplorerLocation.asObservable();
  fileExplorerLocationArrayChange$ = this.fileExplorerLocationArray.asObservable();

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
  constructor() {

    this.fileExplorerLocationChange$.subscribe(location => {
      const names: Array<string> = [];
      let node: ExplorerNavNode | undefined = location.child;
      while (node) {
        names.push(node.name);
        node = node.child;
      }
      this.fileExplorerLocationArray.next(names);
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

}
