import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {extract, Route} from '../core';
import {TrophiesComponent} from './trophies.component';

const routes: Routes = [
  Route.withShell([
    // {path: '', redirectTo: '/trophies', pathMatch: 'full'},
    {path: 'trophies', component: TrophiesComponent, data: {title: extract('Trophies')}},
    // {path: 'trophies/:trophyHash/locations', component: TrophiesComponent, data: {title: extract('Locations')}},
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrophiesRoutingModule {
}
