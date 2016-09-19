/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SomeServiceService } from './some-service.service';

describe('Service: SomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SomeServiceService]
    });
  });

  it('should ...', inject([SomeServiceService], (service: SomeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
