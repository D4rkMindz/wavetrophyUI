import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventsRoutingModule} from './events-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CoreModule} from '../core';
import {SharedModule} from '../shared';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventsComponent} from './events.component';
import {CreateEventFormComponent} from './create-event-form/create-event-form.component';
import {EventService} from '@app/events/event.service';

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
    EventsRoutingModule
  ],
  declarations: [EventsComponent, CreateEventFormComponent],
  providers: [EventService],
})
export class EventsModule {
}
