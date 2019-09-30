import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteConstants} from '../../../app.route.constants';



const routeName = RouteConstants.routeNames;
const APP_Proposal_ROUTES: Routes = [{
}];

@NgModule({
  imports: [RouterModule.forChild(APP_Proposal_ROUTES)],
  exports: [RouterModule]
})

export class ProposalRouterModule { }
