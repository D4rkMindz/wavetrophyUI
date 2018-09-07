import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrophiesRoutingModule} from './trophies-routing.module';
import {TrophiesComponent} from './trophies.component';
import {SharedModule} from '@app/shared';
import {TranslateModule} from '@ngx-translate/core';
import {CoreModule} from '@app/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@app/material.module';
import {HomeRoutingModule} from '@app/home/home-routing.module';
import {TrophyService} from '@app/trophies/trophy.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    TrophiesRoutingModule,
  ],
  declarations: [TrophiesComponent],
  providers: [TrophyService],
})
export class TrophiesModule {
}
