import { TestBed } from '@angular/core/testing';

import { ExplorerUiStateService } from './explorer-ui-state.service';

describe('UiStateService', () => {
  let service: ExplorerUiStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExplorerUiStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
