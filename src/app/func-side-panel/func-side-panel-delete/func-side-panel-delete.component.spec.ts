import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncSidePanelDeleteComponent } from './func-side-panel-delete.component';

describe('FuncSidePanelDeleteComponent', () => {
  let component: FuncSidePanelDeleteComponent;
  let fixture: ComponentFixture<FuncSidePanelDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncSidePanelDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncSidePanelDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
