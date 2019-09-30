import { Component, OnInit } from '@angular/core';
import { IControl } from '../../services/model/control';
import { ITile } from '../../services/model/tile';
import { IProposal } from '../../services/model/proposal';
import { ProposalWrapperService } from '../../services/proposal.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html'
})
export class ProposalComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  _mockDataArray: any[];
  // tslint:disable-next-line:variable-name
  _tilesArray: ITile[];
  // tslint:disable-next-line:variable-name
  _proposalArray: IProposal[];

  constructor(private proposalDataSerivce: ProposalWrapperService) {}

  ngOnInit() {
    this.getAllData();
  }
  getTilesData(mockData: any[]) {
    this._tilesArray = [];
    if (mockData !== null && mockData.length > 0) {
      mockData.forEach(data => {
        const tilesArray: [] = data.tiles.split(',');
        if (tilesArray !== null && tilesArray.length > 0) {
          tilesArray.forEach(el => {
            let controlsArray: IControl[];
            controlsArray = data.children.filter(s => s.tileid === el);
            this._tilesArray.push({ tileId: el, controls: controlsArray } as ITile);
          });
        }
      });
    }
  }

  getProposalData(mockData: any[]) {
    if (mockData !== null && mockData.length > 0) {
      this._proposalArray = [];
      mockData.forEach(data => {
        // tslint:disable-next-line:max-line-length
        // this._proposalArray.push({ category: data.category, id: data.id, controls: data.children.filter(x => x.tileid == 1) } as IProposal);
        this._proposalArray.push({ category: data.category, id: data.id, controls: [] } as IProposal);
      });
    }
  }

  getAllData(): void {
    this.proposalDataSerivce.getMockData().subscribe(
      resultArray => {
        this._mockDataArray = resultArray;
        this.getTilesData(this._mockDataArray);
        this.getProposalData(this._mockDataArray);
      },
      error => {
        console.log('Error :: ' + error);
      }
    );
  }
}
