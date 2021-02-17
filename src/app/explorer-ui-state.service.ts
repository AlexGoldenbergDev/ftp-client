import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {FuncSidePanelMode} from './func-side-panel/FuncSidePanelMode';

@Injectable({
  providedIn: 'root'
})
export class ExplorerUiStateService{

  private sidePanelToggleState = new Subject<boolean>();

  sidePanelToggleStateChange$ = this.sidePanelToggleState.asObservable();

  private funcSidePanelToggleState = new Subject<boolean>();

  funcSidePanelToggleStateChange$ = this.funcSidePanelToggleState.asObservable();

  private funcSidePanelToggleMode = new Subject<FuncSidePanelMode>();

  funcSidePanelToggleMode$ = this.funcSidePanelToggleMode.asObservable();

  private funcSidePanelMode: FuncSidePanelMode = FuncSidePanelMode.Upload;
  private funcSidePanelState = false;



  constructor() {
    this.funcSidePanelToggleMode$.subscribe(mode => this.funcSidePanelMode = mode);
    this.funcSidePanelToggleStateChange$.subscribe(state => this.funcSidePanelState = state);
  }

  changeSidePanelToggleState(state: boolean): void {
    this.sidePanelToggleState.next(state);
  }



  changeFuncSidePanelMode(mode: FuncSidePanelMode, state: boolean): void {
    if (mode === this.funcSidePanelMode || !this.getFuncSidePanelState()) {
      this.funcSidePanelToggleState.next(state);
    }
    this.funcSidePanelToggleMode.next(mode);
  }


  getFuncSidePanelMode(): FuncSidePanelMode {
    return this.funcSidePanelMode;
  }

  getFuncSidePanelState(): boolean {
    return this.funcSidePanelState;
  }


}

