import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {extract, Route} from '@app/core';
import {GroupsComponent} from '@app/groups/groups.component';

const routes: Routes = [
  Route.withShell([
    {path: 'trophies/:trophyHash/groups', component: GroupsComponent, data: {title: extract('Trophies')}},
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
