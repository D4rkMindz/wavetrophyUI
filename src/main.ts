/*
 * Entry point of the application.
 * Only platform bootstrapping code should be here.
 * For app-specific initialization, use `app/app.component.ts`.
 */

import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app.module';
import { environment } from '@env/environment';
import {Logger} from '@app/core';

if (environment.production) {
  enableProdMode();
}

const logger = new Logger('MAIN.TS');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => logger.debug(err));
