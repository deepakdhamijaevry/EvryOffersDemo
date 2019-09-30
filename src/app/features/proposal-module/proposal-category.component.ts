import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IProposal } from '../../services/model/proposal';
import { ITile } from '../../services/model/tile';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { IControl } from 'src/app/services/model/control';

@Component({
  selector: 'app-proposal-category',
  templateUrl: './proposal-category.component.html'
})
export class ProposalCategoryComponent implements OnInit, OnChanges {
  @Input() proposalList: IProposal[] = [];
  @Input() tilesList: ITile[] = [];
  proposals: any = [];
  tiles: any = [];
  constructor() {}

  ngOnInit() {}
  ngOnChanges() {
    this.proposals = this.proposalList;
    this.tiles = this.tilesList;
  }
  drop(event: CdkDragDrop<string[]>) {
    /** if item is sorted or item is shuffeled in same container */
    if (event.previousContainer === event.container) {
      const previousIndexItem = this.proposals[0].controls.find(t => t.order === event.previousIndex);
      const currentIndexItem = this.proposals[0].controls.find(t => t.order === event.currentIndex);
      previousIndexItem.order = event.currentIndex;
      currentIndexItem.order = event.previousIndex;
      this.proposals[0].controls.sort((a, b) => {
        return a.order as any - b.order as any;
      });
    } else {
      let index = event.currentIndex;
      const tempArray = JSON.parse(JSON.stringify(event.item.data.controls));
      tempArray.forEach(data => {
        this.proposals[0].controls.splice(index, 0, data);
        index++;
      });

      this.proposals[0].controls.forEach((item: { order: any; }, i: any) => {
        item.order = i;
      });

      this.proposals[0].controls.sort((a: { order: any; }, b: { order: number; }) => {
        return a.order as any - b.order as any;
      });
    }
    // https://blog.angularindepth.com/exploring-drag-and-drop-with-the-angular-material-cdk-2e0237857290
  }
  onDblClick(item: IControl) {
    item.isdragdisabled = false;
  }
}
