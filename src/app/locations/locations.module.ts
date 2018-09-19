import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LocationsRoutingModule} from './locations-routing.module';
import {LocationsComponent} from './locations.component';
import {CreateLocationFormComponent} from './create-location-form/create-location-form.component';
import {LocationService} from './location.service';
import {TranslateModule} from '@ngx-translate/core';
import {CoreModule} from '../core';
import {SharedModule} from '../shared';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LocationsRoutingModule
  ],
  declarations: [LocationsComponent, CreateLocationFormComponent],
  providers: [LocationService]
})
export class LocationsModule {
}
