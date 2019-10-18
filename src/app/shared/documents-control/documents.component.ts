import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ValidatorService } from '../utility/validation.service';


@Component({
  selector: 'app-documents-control',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  @Input() data: Date;
  @Output() IsDragDisabled: EventEmitter<string> = new EventEmitter();
  files = [];
  imageUrl = '';
  constructor(public validatorService: ValidatorService) {

  }


  onSingleClick(event: any) {
    this.IsDragDisabled.emit('true');
  }
  onDblClick(event: any) {
    this.IsDragDisabled.emit('false');
  }

  // file upload methods starts
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files.length > 0) {
      {
        for (var i = 0; i < event.target.files.length; i++) {
          this.files.push(event.target.files[i]);
        }
      } 
    }
  }

}




