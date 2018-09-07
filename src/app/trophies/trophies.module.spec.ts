import { TrophiesModule } from './trophies.module';

describe('TrophiesModule', () => {
  let trophiesModule: TrophiesModule;

  beforeEach(() => {
    trophiesModule = new TrophiesModule();
  });

  it('should create an instance', () => {
    expect(trophiesModule).toBeTruthy();
  });
});
