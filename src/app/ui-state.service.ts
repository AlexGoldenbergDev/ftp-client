import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  private sidePanelToggleState = new Subject<boolean>();

  constructor() { }

  sidePanelToggleStateChange$ = this.sidePanelToggleState.asObservable();

  changeSidePanelToggleState(state: boolean): void {
    this.sidePanelToggleState.next(state);
  }

}

