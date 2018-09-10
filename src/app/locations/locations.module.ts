import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LocationsRoutingModule} from './locations-routing.module';
import {LocationsComponent} from './locations.component';
import {CreateLocationFormComponent} from './create-location-form/create-location-form.component';
import {LocationService} from '@app/locations/location.service';
import {TranslateModule} from '@ngx-translate/core';
import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@app/material.module';
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
