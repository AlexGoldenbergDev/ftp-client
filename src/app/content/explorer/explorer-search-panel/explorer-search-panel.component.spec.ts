import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerSearchPanelComponent } from './explorer-search-panel.component';

describe('ExplorerSearchPanelComponent', () => {
  let component: ExplorerSearchPanelComponent;
  let fixture: ComponentFixture<ExplorerSearchPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerSearchPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
