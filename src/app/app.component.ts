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
      extraPlugins: 'justify,font,selectall',
      autoParagraph : false
    }
  }

  ngOnInit() {
    this.getMockData();

  }

  drop(event: CdkDragDrop<string[]>) {

    /** if item is sorted or item is shuffeled in same container */
    if (event.previousContainer === event.container) {
      let previousIndexItem = this._proposalArray[0].controls.find(t => t.order == event.previousIndex);
      let currentIndexItem = this._proposalArray[0].controls.find(t => t.order == event.currentIndex);
      previousIndexItem.order = event.currentIndex;
      currentIndexItem.order = event.previousIndex;
      this._proposalArray[0].controls.sort((a, b) => {
        return <any>(a.order) - <any>(b.order);
      });

    } else {
      let index = event.currentIndex;
      var tempArray = JSON.parse(JSON.stringify(event.item.data.controls));
      tempArray.forEach(data => {
        this._proposalArray[0].controls.splice(index, 0, data);
        index++;
      });

      this._proposalArray[0].controls.sort((a, b) => {
        return <any>(a.order) - <any>(b.order);
      });
    }
    // https://blog.angularindepth.com/exploring-drag-and-drop-with-the-angular-material-cdk-2e0237857290


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




