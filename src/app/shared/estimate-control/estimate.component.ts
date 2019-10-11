import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { EstimateTable, EstimateObject } from '../../services/model/estimate';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-estimate-control',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.scss']
})

export class EstimateComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: string;
  @Input() isPreview: boolean = false;
  @Input() submitValidation: Observable<void>;
  @Output() onValueChange: EventEmitter<string> = new EventEmitter();
  @Output() IsDragDisabled: EventEmitter<string> = new EventEmitter();  
  estimateTable: EstimateTable[] = [];
  estErrorTable: EstimateTable[] = [];
  subscription: Subscription;
  isTitle = true;
  estTableTitle: string;
  estObject: EstimateObject;
  maxArrayLength = 20;
  previewData: any;

  constructor() {    
  }

  ngOnInit() {   
    if (this.isPreview) {
      this.subscription = this.submitValidation.subscribe(event => this.submit(this.estTableTitle, this.estimateTable));
    }
    if (!this.isPreview) {
      this.subscription = this.submitValidation.subscribe(event => this.submit(this.estTableTitle, this.estimateTable));
      this.estTableTitle = '';
      this.estObject = {
        estTitle: '',
        estTable: ''
      };
      this.addColumnCell();
    }
  }
  ngOnChanges() {
    if (this.isPreview == true) {
      this.previewData = JSON.parse(this.data);
      this.estimateTable.length = 0;
      this.estErrorTable.length = 0;
      this.estTableTitle = this.previewData.estTitle;
      for (var i = 0; i < this.previewData.estTable.length; i++) {
        const ColumnArray = { column: [] };
        const errColumn = { column: [] };
        for (var j = 0; j < this.previewData.estTable[0].row.column.length; j++) {
          const cell = { columnCell: this.previewData.estTable[i].row.column[j].columnCell };
          ColumnArray.column.push(cell);
          const errCell = { columnCell: '' };
          errColumn.column.push(errCell);
        }
        const rowObject = { row: ColumnArray };
        this.estimateTable.push(rowObject);
        const errRow = { row: errColumn };
        this.estErrorTable.push(errRow);
      }
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  addColumnCell() {
    const cell = { columnCell: '' };
    const cellColumn = { column: [] };
    cellColumn.column.push(cell);
    const newRow = { row: cellColumn };
    this.estimateTable.push(newRow);

    const errCell = { columnCell: '' };
    const errCellColumn = { column: [] };
    errCellColumn.column.push(errCell);
    const errRow = { row: errCellColumn };
    this.estErrorTable.push(errRow);
  }
  addColumn() {
    const tableArrayLength = this.estimateTable.length;
    if (this.maxArrayLength > this.estimateTable[0].row.column.length) {
      for (var i = 0; i < tableArrayLength; i++) {
        const cell = { columnCell: '' };
        this.estimateTable[i].row.column.push(cell);
      }
      for (var i = 0; i < tableArrayLength; i++) {
        const errCell = { columnCell: '' };
        this.estErrorTable[i].row.column.push(errCell);
      }
      this.estimateTable = this.estimateTable;
      this.estErrorTable = this.estErrorTable;
    }
  }
  addRow() {
    var tableColumnLength = this.estimateTable[0].row.column.length;
    if (this.maxArrayLength > this.estimateTable.length) {
      const rowObject = { row: null };
      const rowArray = { column: [] };
      for (var i = 0; i < tableColumnLength; i++) {
        var cell = { columnCell: '' };
        rowArray.column.push(cell);
      }
      rowObject.row = rowArray;
      this.estimateTable.push(rowObject);
      this.estimateTable = this.estimateTable;

      const errRowObject = { row: null };
      const errRowArray = { column: [] };
      for (var i = 0; i < tableColumnLength; i++) {
        var cell = { columnCell: '' };
        errRowArray.column.push(cell);
      }
      errRowObject.row = errRowArray;
      this.estErrorTable.push(errRowObject);
      this.estErrorTable = this.estErrorTable;
    }
  }
  checkTitleValidation(ev) {
    if (ev.target.value !== '') {
      this.isTitle = true;
    } else {
      this.isTitle = false;
    }
  }
  checkEstTableValidation(ev, rowIndex, colIndex) {
    if (ev.target.value !== '') {
      this.estErrorTable[rowIndex].row.column[colIndex].columnCell = '';
    }
    this.estErrorTable = this.estErrorTable;
  }
  deleteColumn(index) {
    const tableArrayLength = this.estimateTable.length;
    for (var i = 0; i < tableArrayLength; i++) {
      this.estimateTable[i].row.column.splice(index, 1);
    }
    for (var i = 0; i < tableArrayLength; i++) {
      this.estErrorTable[i].row.column.splice(index, 1);
    }
    if (this.estimateTable[0].row.column.length === 0) {
      this.estimateTable.splice(0, this.estimateTable.length);
      this.estErrorTable.splice(0, this.estErrorTable.length);
      this.addColumnCell();
    }
    this.estimateTable = this.estimateTable;
  }
  deleteRow(index) {
    this.estimateTable.splice(index, 1);
    this.estErrorTable.splice(index, 1);
    if (this.estimateTable.length === 0) {
      this.addColumnCell();
    }
    this.estimateTable = this.estimateTable;
  }      
  resetForm() {
    this.estimateTable.splice(0, this.estimateTable.length);
    this.estErrorTable.splice(0, this.estErrorTable.length);
    if (this.estimateTable.length === 0) {
      this.addColumnCell();
    }
    this.estTableTitle = '';
    this.isTitle = true;
    this.estObject = {
      estTitle: '',
      estTable: ''
    };
  }
  submit(matTitle, matValue) {
    var istableValid = this.validateSubmitFunction();
    if (istableValid) {
      this.estObject = {
        estTitle: matTitle,
        estTable: matValue
      };
      this.data = JSON.stringify(this.estObject);
      this.onValueChange.emit(this.data);
    }
  }
  validateSubmitFunction() {
    let validSubmission = true;
    this.estimateTable.forEach((element, rowIndex) => {
      element.row.column.forEach((columnArray, colIndex) => {
        if (columnArray.columnCell === '') {
          this.estErrorTable[rowIndex].row.column[colIndex].columnCell = 'required';
          validSubmission = false;
        }
      });
    });
    if (this.estTableTitle === '') {
      this.isTitle = false;
      validSubmission = false;
    }
    return validSubmission;
  }
  onSingleClick(event: any) {
    this.IsDragDisabled.emit('false');
  }
  onDblClick(event: any) {
    this.IsDragDisabled.emit('false');
  }

}
