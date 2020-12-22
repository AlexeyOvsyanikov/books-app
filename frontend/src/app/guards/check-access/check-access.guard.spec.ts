import { TestBed } from '@angular/core/testing';

import { CheckAccessGuard } from './check-access.guard';

describe('CheckAccessGuard', () => {
  let guard: CheckAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
