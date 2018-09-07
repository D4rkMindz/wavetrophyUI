import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupsRoutingModule} from './groups-routing.module';
import {GroupsComponent} from './groups.component';
import {GroupService} from '@app/groups/group.service';
import {TranslateModule} from '@ngx-translate/core';
import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@app/material.module';
import {HomeRoutingModule} from '@app/home/home-routing.module';
import { CreateGroupFormComponent } from './create-group-form/create-group-form.component';
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
    HomeRoutingModule,
    GroupsRoutingModule
  ],
  declarations: [GroupsComponent, CreateGroupFormComponent],
  providers: [GroupService],
})
export class GroupsModule {
}
