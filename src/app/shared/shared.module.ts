import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialModule} from '@app/material.module';
import {LoaderComponent} from './loader/loader.component';
import {ImageUploadComponent} from './image-upload/image-upload.component';
import {ImageUploadService} from './image-upload/image-upload.service';
import {StopPropagationDirective} from './directives/stop-propagation.directive';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
  ],
  declarations: [
    LoaderComponent,
    ImageUploadComponent,
    StopPropagationDirective,
  ],
  exports: [
    LoaderComponent,
    StopPropagationDirective,
  ],
  providers: [ImageUploadService],
  entryComponents: [ImageUploadComponent],
})
export class SharedModule {
}
