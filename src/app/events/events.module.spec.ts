import { EventsModule } from './events.module'; // dont replace this with @app/events -> circular dependency

describe('EventsModule', () => {
  let eventsModule: EventsModule;

  beforeEach(() => {
    eventsModule = new EventsModule();
  });

  it('should create an instance', () => {
    expect(eventsModule).toBeTruthy();
  });
});
