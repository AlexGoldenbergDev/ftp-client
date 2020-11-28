import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerTableComponent } from './explorer-table.component';

describe('ExplorerTableComponent', () => {
  let component: ExplorerTableComponent;
  let fixture: ComponentFixture<ExplorerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
