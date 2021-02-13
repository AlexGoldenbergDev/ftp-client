import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  private sidePanelToggleState = new Subject<boolean>();

  sidePanelToggleStateChange$ = this.sidePanelToggleState.asObservable();

  private funcSidePanelToggleState = new Subject<boolean>();

  funcSidePanelToggleStateChange$ = this.funcSidePanelToggleState.asObservable();


  constructor() { }

  changeSidePanelToggleState(state: boolean): void {
    this.sidePanelToggleState.next(state);
  }

  changeFuncSidePanelToggleState(state: boolean): void {
    this.funcSidePanelToggleState.next(state);
  }

}

