import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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

 
  // todo = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ];

  // done = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];


  constructor(private mockDataSerivce: MockWrapperService) {

  }

  ngOnInit() {
    this.getMockData();

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
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
            debugger;
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
        debugger;
        this._proposalArray.push({category :data.category, id : data.id, controls : data.children} as IProposal)
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




