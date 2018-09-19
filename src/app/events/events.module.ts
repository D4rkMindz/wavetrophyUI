import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// dont replace this with @app/events -> circular dependency
import {EventsRoutingModule} from './events-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@app/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventsComponent} from './events.component';
import {CreateEventFormComponent} from './create-event-form/create-event-form.component';
import {EventService} from './event.service';

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
