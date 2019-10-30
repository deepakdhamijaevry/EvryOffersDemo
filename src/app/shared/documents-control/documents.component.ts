import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ValidatorService } from '../utility/validation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-documents-control',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  @Input() data: Date;
  @Output() IsDragDisabled: EventEmitter<string> = new EventEmitter();
  files = [];
  @ViewChild('documentFile', { static: false }) documentFileVariable: ElementRef;
  constructor(public validatorService: ValidatorService, public utilityService: UtilityService) {

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
    this.reset();
  }

  onDeleteFile(file: any) {
    if (file !== null && file !== undefined) {
      let index = this.files.find(f => f == file);
      this.files.splice(index, 1);
    }
  }

  previewFile(file: any) {
    if (file !== null) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.utilityService.previewFile(event.target.result, file.type);
      };
    }
  }

  reset() {
    this.documentFileVariable.nativeElement.value = "";
  }

}




