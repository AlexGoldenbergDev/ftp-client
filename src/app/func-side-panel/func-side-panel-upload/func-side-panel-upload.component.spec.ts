import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncSidePanelUploadComponent } from './func-side-panel-upload.component';

describe('FuncSidePanelUploadComponent', () => {
  let component: FuncSidePanelUploadComponent;
  let fixture: ComponentFixture<FuncSidePanelUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncSidePanelUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncSidePanelUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
