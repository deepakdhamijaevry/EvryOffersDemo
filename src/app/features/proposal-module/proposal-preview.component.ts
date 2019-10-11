import { Component, OnInit, Input } from '@angular/core';
import { IProposal } from '../../services/model/proposal';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-proposal-preview',
  templateUrl: './proposal-preview.component.html'
})
export class ProposalPreviewComponent implements OnInit {
  @Input() proposalList: IProposal[];
  categorySubject:Subject<any> = new Subject();
  constructor() {

  }

  ngOnInit() {
    this.categorySubject.next();
    
  }



}




