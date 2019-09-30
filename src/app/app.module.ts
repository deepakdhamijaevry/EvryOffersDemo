import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProposalWrapperService } from './services/proposal.service';
// import { CKEditorModule } from 'ckeditor4-angular';
// import {ComponentsModule} from './shared/components.module';
import {ProposalModule} from './features/proposal-module/shared/proposal.module';

// import { ProposalComponent } from './features/proposal-module/proposal.component';
// import { ProposalCategoryComponent } from './features/proposal-module/proposal-category.component';
// import { ProposalPreviewComponent } from './features/proposal-module/proposal-preview.component';
@NgModule({
  declarations: [
    AppComponent,
    //  ProposalComponent,
    //  ProposalCategoryComponent,
    //  ProposalPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // DragDropModule,
    FormsModule,
    HttpModule,
    // CKEditorModule,
    // ComponentsModule,
    ProposalModule
  ],
  providers: [ProposalWrapperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
