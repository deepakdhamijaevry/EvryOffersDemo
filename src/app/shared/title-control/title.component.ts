import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-title-control',
  templateUrl: './title.component.html'

})
export class TitleComponent implements OnInit {
  @Input() data: string;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onValueChange: EventEmitter<string> = new EventEmitter();
  @Output() IsDragDisabled: EventEmitter<string> = new EventEmitter();
  constructor() {

  }

  ngOnInit() {


  }
  onKeyUp(event: any) {
    this.data = event.target.value;
    this.onValueChange.emit(this.data);
  }
  onSingleClick(event: any) {
    this.IsDragDisabled.emit('true');
   }
   onDblClick(event: any) {
     this.IsDragDisabled.emit('false');
   }


}




