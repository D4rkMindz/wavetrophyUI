import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {extract, Route} from '../core';
import {EventsComponent} from '@app/events/events.component';

const routes: Routes = [
  Route.withShell([
    {
      path: 'trophies/:trophyHash/groups/:groupHash/locations/:locationHash/events',
      component: EventsComponent,
      data: {title: extract('Events')},
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
