import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subtitle-control',
  templateUrl: './subtitle.component.html',
  styleUrls: ['./subtitle.component.scss']
})
export class SubtitleComponent implements OnInit {
  @Input() data: string;
  @Output() onValueChange: EventEmitter<string> = new EventEmitter();
  @Output() IsDragDisabled: EventEmitter<string> = new EventEmitter();

  constructor() { }

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
