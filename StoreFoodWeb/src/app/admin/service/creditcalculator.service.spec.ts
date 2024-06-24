import { TestBed } from '@angular/core/testing';

import { CreditcalculatorService } from './creditcalculator.service';

describe('CreditcalculatorService', () => {
  let service: CreditcalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditcalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
