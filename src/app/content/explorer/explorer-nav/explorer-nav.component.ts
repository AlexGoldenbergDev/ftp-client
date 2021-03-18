import {Component, OnInit} from '@angular/core';
import { ExplorerNavNode } from './explorer-nav.node';
import {FileService} from '../../../file.service';

@Component({
  selector: 'app-explorer-nav',
  templateUrl: './explorer-nav.component.html',
  styleUrls: ['./explorer-nav.component.css']
})
export class ExplorerNavComponent implements OnInit {

  location = new ExplorerNavNode('/', '/', undefined);
  locationArray: Array<string> = ['/'];

  constructor(private fileService: FileService) {
    this.fileService.fileExplorerLocationArrayChange$.subscribe(location => this.locationArray = location);
    this.fileService.fileExplorerLocationChange$.subscribe(location => this.location = location);
    this.fileService.changeExplorerLocation(this.location);
  }

  ngOnInit(): void {
  }

  changeLocationDown(index: number): void {
    let location = '';
    let i = 0;
    let node = this.location;
    while (i < index) {
      location = location.concat(node.link);
      // @ts-ignore
      node = node.child;
      i++;
    }
    node.child = undefined;
    this.fileService.changeExplorerLocation(this.location);
  }

  changeLocationUp(): void {
    let node = this.location;
    if (node.child) {
      let location = '';
      while (node.child?.child) {
        location = location.concat(node.link);
        node = node.child;
      }
      node.child = undefined;
      this.fileService.changeExplorerLocation(this.location);
    }

  }
}
