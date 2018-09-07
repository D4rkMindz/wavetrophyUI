import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {extract, Route} from '../core';
import {LocationsComponent} from './locations.component';

const routes: Routes = [
  Route.withShell([
    {
      path: 'trophies/:trophyHash/groups/:groupHash/locations',
      component: LocationsComponent,
      data: {title: extract('Locations')},
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule {
}
