import {Component, OnInit} from '@angular/core';
import { ExplorerNavNode } from './explorer-nav.node';
import {FileService} from '../../../file.service';

@Component({
  selector: 'app-explorer-nav',
  templateUrl: './explorer-nav.component.html',
  styleUrls: ['./explorer-nav.component.css']
})
export class ExplorerNavComponent implements OnInit {

  location: Array<string> = ['/'];

  constructor(private fileService: FileService) {
    this.fileService.fileExplorerLocationArrayChange$.subscribe(location => this.location = location);
    this.fileService.changeExplorerLocation(
      new ExplorerNavNode('rootNode', '',
        new ExplorerNavNode('/', '/',
          new ExplorerNavNode('home', '/home', undefined)))
    );
  }

  ngOnInit(): void {
  }
}
