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
  _config: any;

  constructor(private mockDataSerivce: MockWrapperService) {
    this._config = {
      toolbar: [
        ['Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'SelectAll', '-', 'Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Outdent', 'Indent'],
        ['list', 'indent', '-', 'NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        ['Format', 'Font', 'FontSize'],
      ],
      extraPlugins: 'justify,font,selectall'
    }
  }

  ngOnInit() {
    this.getMockData();

  }

  drop(event: CdkDragDrop<string[]>) {
      /** if item is sorted or item is shuffeled in same container */
      if (event.previousContainer === event.container) {
        this.sortItemsinProposalList(event.previousIndex, event.currentIndex, this._proposalArray);

      } else {
        this.addItemsToProposalList(event.currentIndex, this._proposalArray, event.item.data);
      }
      // https://blog.angularindepth.com/exploring-drag-and-drop-with-the-angular-material-cdk-2e0237857290
  }
  
  addItemsToProposalList(index: number, proposalArray: IProposal[], dropTile: ITile) {
    dropTile.controls.forEach(data => {
      proposalArray[0].controls.splice(index, 0, data);
      index++;
    });

    proposalArray[0].controls.forEach((item, idx) => {
      item.order = idx;
    });
    proposalArray[0].controls.sort((a, b) => {
      return <any>(a.order) - <any>(b.order);
    });
  }
  sortItemsinProposalList(previousIndex: number, currentIndex: number, proposalArray: IProposal[]) {
    let previousIndexItem = proposalArray[0].controls.find(t => t.order == previousIndex);
    let currentIndexItem = proposalArray[0].controls.find(t => t.order == currentIndex);
    previousIndexItem.order = currentIndex;
    currentIndexItem.order = previousIndex;

    proposalArray[0].controls.sort((a, b) => {
      return <any>(a.order) - <any>(b.order);
    });
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




