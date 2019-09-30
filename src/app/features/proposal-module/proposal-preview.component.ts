import { Component, OnInit, Input } from '@angular/core';
import { IProposal } from '../../services/model/proposal';
@Component({
  selector: 'app-proposal-preview',
  templateUrl: './proposal-preview.component.html'
})
export class ProposalPreviewComponent implements OnInit {
  @Input() proposalList: IProposal[];
  constructor() {

  }

  ngOnInit() {


  }



}




