import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncSidePanelComponent } from './func-side-panel.component';

describe('FuncSidePanelComponent', () => {
  let component: FuncSidePanelComponent;
  let fixture: ComponentFixture<FuncSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncSidePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
