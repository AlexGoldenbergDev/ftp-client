import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerControlPanelButtonComponent } from './explorer-control-panel-button.component';

describe('ExplorerControlPanelButtonComponent', () => {
  let component: ExplorerControlPanelButtonComponent;
  let fixture: ComponentFixture<ExplorerControlPanelButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerControlPanelButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerControlPanelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
