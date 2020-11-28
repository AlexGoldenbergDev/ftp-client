import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerControlPanelComponent } from './explorer-control-panel.component';

describe('ExplorerControlPanelComponent', () => {
  let component: ExplorerControlPanelComponent;
  let fixture: ComponentFixture<ExplorerControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerControlPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
