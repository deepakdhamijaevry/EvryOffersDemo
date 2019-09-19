import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MockWrapperService } from './services/mock.service';
import { CKEditorModule } from 'ckeditor4-angular';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    HttpModule,
    CKEditorModule
  ],
  providers: [MockWrapperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
