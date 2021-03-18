import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelButtonComponent } from './sidepanel-button.component';

describe('SidePanelButtonComponent', () => {
  let component: SidePanelButtonComponent;
  let fixture: ComponentFixture<SidePanelButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidePanelButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
