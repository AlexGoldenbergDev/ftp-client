import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  private sidePanelToggleState = new Subject<boolean>();

  sidePanelToggleStateChange$ = this.sidePanelToggleState.asObservable();


  constructor() { }

  changeSidePanelToggleState(state: boolean): void {
    this.sidePanelToggleState.next(state);
  }

}

