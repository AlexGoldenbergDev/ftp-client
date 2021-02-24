import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncSidePanelCreateFolderComponent } from './func-side-panel-create-folder.component';

describe('FuncSidePanelCreateFolderComponent', () => {
  let component: FuncSidePanelCreateFolderComponent;
  let fixture: ComponentFixture<FuncSidePanelCreateFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncSidePanelCreateFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncSidePanelCreateFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
