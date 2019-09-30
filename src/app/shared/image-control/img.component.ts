import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img-control',
  templateUrl: './img.component.html'

})
export class ImgComponent implements OnInit {
  @Input() data: Date;
  @Output() IsDragDisabled: EventEmitter<string> = new EventEmitter();
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




}




