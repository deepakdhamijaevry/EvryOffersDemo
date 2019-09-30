import { CdkTableModule } from '@angular/cdk/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { CKEditorModule } from 'ckeditor4-angular';
// components
import { DescriptionComponent } from './description-control/description.component';
import { ImgComponent } from './image-control/img.component';
import { TitleComponent } from './title-control/title.component';


@NgModule({
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, CommonModule, PlatformModule, CKEditorModule],
  declarations: [DescriptionComponent, ImgComponent, TitleComponent],
  exports: [DescriptionComponent, ImgComponent, TitleComponent, PlatformModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
