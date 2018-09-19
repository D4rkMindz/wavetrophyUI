import { TestBed, inject } from '@angular/core/testing';

import { EventService } from './event.service'; // dont replace this with @app/events -> circular dependency

describe('EventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventService]
    });
  });

  it('should be created', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));
});
