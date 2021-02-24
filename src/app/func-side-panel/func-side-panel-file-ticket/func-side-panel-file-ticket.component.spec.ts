import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncSidePanelFileTicketComponent } from './func-side-panel-file-ticket.component';

describe('FuncSidePanelFileTicketComponent', () => {
  let component: FuncSidePanelFileTicketComponent;
  let fixture: ComponentFixture<FuncSidePanelFileTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncSidePanelFileTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncSidePanelFileTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
