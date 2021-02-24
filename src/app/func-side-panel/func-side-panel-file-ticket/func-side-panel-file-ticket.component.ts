import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-func-side-panel-file-ticket',
  templateUrl: './func-side-panel-file-ticket.component.html',
  styleUrls: ['./func-side-panel-file-ticket.component.css']
})
export class FuncSidePanelFileTicketComponent implements OnInit {

  @Input()
  name = '';

  @Input()
  type = 'file';

  value = 0;
  icon = 'description';

  constructor() { }

  ngOnInit(): void {}

}
