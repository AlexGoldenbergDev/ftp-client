import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerNavComponent } from './explorer-nav.component';

describe('ExplorerNavComponent', () => {
  let component: ExplorerNavComponent;
  let fixture: ComponentFixture<ExplorerNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
