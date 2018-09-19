import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {extract, Route} from '@app/core';
import {EventsComponent} from './events.component'; // dont replace this with @app/events -> circular dependency

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
