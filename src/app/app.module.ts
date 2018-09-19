import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';

import {CoreModule} from './core';
import {SharedModule} from './shared';
import {HomeModule} from './home/home.module';
import {AboutModule} from './about/about.module';
import {LoginModule} from './login/login.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {TrophiesModule} from './trophies/trophies.module';
import {GroupsModule} from './groups/groups.module';
import {LocationsModule} from './locations/locations.module';
import {EventsModule} from './events/events.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AboutModule,
    LoginModule,
    TrophiesModule,
    GroupsModule,
    LocationsModule,
    EventsModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
