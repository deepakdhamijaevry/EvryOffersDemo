import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  ProposalComponent,
   ProposalCategoryComponent,
  ProposalPreviewComponent
} from './index.proposal';
import {ComponentsModule} from '../../../shared/components.module';
// import { ProposalRouterModule } from './proposal.route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    // ProposalRouterModule,
    DragDropModule,
    ComponentsModule
  ],
  declarations: [
    ProposalComponent,
     ProposalCategoryComponent,
    ProposalPreviewComponent
  ],
  exports: [ ProposalComponent,
     ProposalCategoryComponent,
    ProposalPreviewComponent]
})

export class ProposalModule {

}
