import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { IControl } from './models/control';
import { ITile } from './models/tile';
import { IProposal } from './models/proposal';
import { MockWrapperService } from "./services/mock.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  _mockDataArray: any[];
  _tilesArray: ITile[];
  _proposalArray: IProposal[];


  constructor(private mockDataSerivce: MockWrapperService) {

  }

  ngOnInit() {
    this.getMockData();

  }

  drop(event: CdkDragDrop<string[]>) {
    debugger;
    if (this._proposalArray != null && this._proposalArray.length > 0 && this._proposalArray[0].controls.length > 0) {
      /** if item is sorted or item is shuffeled in same container */
      if (event.previousContainer === event.container) {
        // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        let previousIndexItem = this._proposalArray[0].controls.find(t => t.order == event.previousIndex);
        let currentIndexItem = this._proposalArray[0].controls.find(t => t.order == event.currentIndex);
        previousIndexItem.order = event.currentIndex;
        currentIndexItem.order = event.previousIndex;

        this._proposalArray[0].controls.sort((a, b) => {
          return <any>(a.order) - <any>(b.order);
        });

      } else {
        // transferArrayItem(event.previousContainer.data,
        //   event.container.data,
        //   event.previousIndex,
        //   event.currentIndex);
        debugger;
        let dropTile: ITile = event.item.data;
        let newIndex = event.currentIndex;
        dropTile.controls.forEach(data => {
          this._proposalArray[0].controls.splice(newIndex, 0, data);
          newIndex++;
        });

        this._proposalArray[0].controls.forEach((item, idx) => {
          item.order = idx;
        });
        this._proposalArray[0].controls.sort((a, b) => {
          return <any>(a.order) - <any>(b.order);
        });
      }
      // https://blog.angularindepth.com/exploring-drag-and-drop-with-the-angular-material-cdk-2e0237857290
    }
    else {
   // transferArrayItem(event.previousContainer.data,
    //   event.container.data,
    //   event.previousIndex,
    //   event.currentIndex);
    debugger;
    let dropTile: ITile = event.item.data;
    let newIndex = 0;
    dropTile.controls.forEach(data => {
      this._proposalArray[0].controls.splice(newIndex, 0, data);
      newIndex++;
    });

    this._proposalArray[0].controls.forEach((item, idx) => {
      item.order = idx;
    });
    this._proposalArray[0].controls.sort((a, b) => {
      return <any>(a.order) - <any>(b.order);
    });
    }

  }

  getTilesData(mockData: any[]) {
    this._tilesArray = [];
    if (mockData !== null && mockData.length > 0) {
      mockData.forEach(data => {
        let tilesArray: [] = data.tiles.split(",");
        if (tilesArray !== null && tilesArray.length > 0) {
          tilesArray.forEach(el => {
            let controlsArray: IControl[];
            controlsArray = data.children.filter(s => s.tileid == el);
            this._tilesArray.push({ tileId: el, controls: controlsArray } as ITile)
          });
        };
      });
    }
  }

  getProposalData(mockData: any[]) {
    if (mockData !== null && mockData.length > 0) {
      this._proposalArray = [];
      mockData.forEach(data => {
        // this._proposalArray.push({ category: data.category, id: data.id, controls: data.children.filter(x => x.tileid == 1) } as IProposal);
        this._proposalArray.push({ category: data.category, id: data.id, controls: [] } as IProposal);
      });
    }
  }

  getMockData(): void {
    this.mockDataSerivce.getMockData()
      .subscribe(
        resultArray => {
          this._mockDataArray = resultArray;
          this.getTilesData(this._mockDataArray);
          this.getProposalData(this._mockDataArray);
        },
        error => { console.log("Error :: " + error) }
      )
  }

}




