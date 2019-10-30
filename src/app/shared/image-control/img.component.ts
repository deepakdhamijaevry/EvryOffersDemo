import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img-control',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']

})
export class ImgComponent implements OnInit {
  @Input() data: Date;
  @Output() IsDragDisabled: EventEmitter<string> = new EventEmitter();
  files = [];
  imageUrl = '';
  constructor() {

  }

  ngOnInit() {


  }
  onSingleClick(event: any) {
    this.IsDragDisabled.emit('true');
  }
  onDblClick(event: any) {
    this.IsDragDisabled.emit('false');
  }

  // file upload methods starts
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      //  const isValid = this.validateFile(event.target.files[0]);
      //  if (isValid) 
      {
        //   this.isFileUploadOpen = true;
        this.files.push(event.target.files[0]);
        const reader = new FileReader();
        reader.onload = (e: any) => { // called once readAsDataURL is completed
          this.imageUrl = '';
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      } {
        this.imageUrl = '';
        //   this.resetFileSelection();
      }
    }
  }



}




