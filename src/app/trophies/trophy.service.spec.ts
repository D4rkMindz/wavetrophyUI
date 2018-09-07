import { TestBed, inject } from '@angular/core/testing';

import { TrophyService } from './trophy.service';

describe('TrophyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrophyService]
    });
  });

  it('should be created', inject([TrophyService], (service: TrophyService) => {
    expect(service).toBeTruthy();
  }));
});
