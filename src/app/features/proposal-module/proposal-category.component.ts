import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IProposal } from '../../services/model/proposal';
import { ITile } from '../../services/model/tile';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { IControl } from 'src/app/services/model/control';
import { Subject } from 'rxjs';
import { ControlType } from '../../shared/enums/app.enum';

@Component({
  selector: 'app-proposal-category',
  templateUrl: './proposal-category.component.html'
})
export class ProposalCategoryComponent implements OnInit, OnChanges {
  @Input() proposalList: IProposal[] = [];
  @Input() tilesList: ITile[] = [];
  categorySubject: Subject<any> = new Subject();
  proposals: any = [];
  tiles: any = [];
  estimateObj: IControl;
  subtitleObj: IControl;
  imageObj: IControl;
  documentsObj: IControl;

  constructor() {
  }

  ngOnInit() {
  }
  ngOnChanges() {
    this.proposals = this.proposalList;
    this.tiles = this.tilesList;
  }
  closeModule(index) {
    this.proposals[0].controls.splice(index, 1);
  }
  drop(event: CdkDragDrop<string[]>) {
    debugger;
    
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
        debugger;
        let index = event.currentIndex;
        let tempArray = [];
        if (event.item.data.controls != null && event.item.data.controls.length > 0) {
          tempArray = JSON.parse(JSON.stringify(event.item.data.controls));
          tempArray.forEach(data => {
            this.proposals[0].controls.splice(index, 0, data);
            index++;
          });
        }
        else if (event.item.data == ControlType.est) {
          this.initEstObj();
          this.proposals[0].controls.splice(index, 0, this.estimateObj);
        }
        else if (event.item.data == ControlType.img) {
          this.initImageObj();
          this.proposals[0].controls.splice(index, 0, this.imageObj);
        }
        else if (event.item.data == ControlType.subtitle) {
          this.initSubtitleObj();
          this.proposals[0].controls.splice(index, 0, this.subtitleObj);
        }
        else if (event.item.data == ControlType.timeline) {
          // this.initEstObj();
          // this.proposals[0].controls.splice(index, 0, this.estObj);
        }
        else if (event.item.data == ControlType.documents) {
          this.initDocumentsObj();
          this.proposals[0].controls.splice(index, 0, this.documentsObj);
        }
        this.proposals[0].controls.forEach((item, i: any) => {
          item.order = i;
        });
        this.proposals[0].controls.sort((a: { order: any; }, b: { order: number; }) => {
          return a.order as any - b.order as any;
        });
      }
    
    // https://blog.angularindepth.com/exploring-drag-and-drop-with-the-angular-material-cdk-2e0237857290     
  }
  initEstObj() {
    this.estimateObj = {
      ctrltype: 'estm',
      ctrvalue: '',
      order: 0,
      tileid: 0,
      isdragdisabled: false
    };
  }
  initImageObj() {
    this.imageObj = {
      ctrltype: 'img',
      ctrvalue: '',
      order: 0,
      tileid: 0,
      isdragdisabled: false
    }
  }

  initDocumentsObj() {
    this.documentsObj = {
      ctrltype: 'documents',
      ctrvalue: '',
      order: 0,
      tileid: 0,
      isdragdisabled: false
    }
  }

  initSubtitleObj() {
    this.subtitleObj = {
      ctrltype: 'subtitle',
      ctrvalue: '',
      order: 0,
      tileid: 0,
      isdragdisabled: false
    }
  }
  onDblClick(item: IControl) {
    item.isdragdisabled = false;
  }
  submitCategory() {
    this.categorySubject.next();
  }
}
