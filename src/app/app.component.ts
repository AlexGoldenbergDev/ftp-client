import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ftp-client';

  columnsAmount = 4;
  rowHeightPercents = 10;

  headerColAmount = this.columnsAmount;
  headerRowAmount = 1;

  contentColAmount = 4;
  contentRowAmount = 9;


}
