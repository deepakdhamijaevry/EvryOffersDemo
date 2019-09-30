import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-description-control',
  templateUrl: './description.component.html'
})
export class DescriptionComponent implements OnInit {
  @Input() data: string;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onValueChange: EventEmitter<string> = new EventEmitter();
  @Output() IsDragDisabled: EventEmitter<string> = new EventEmitter();
  config: any;
  constructor() {
    this.config = {
      toolbar: [
        [
          'Undo',
          'Redo',
          '-',
          'Cut',
          'Copy',
          'Paste',
          'SelectAll',
          '-',
          'Bold',
          'Italic',
          'Underline',
          'StrikeThrough',
          '-',
          'Outdent',
          'Indent'
        ],
        [
          'list',
          'indent',
          '-',
          'NumberedList',
          'BulletedList',
          '-',
          'JustifyLeft',
          'JustifyCenter',
          'JustifyRight',
          'JustifyBlock'
        ],
        ['Format', 'Font', 'FontSize']
      ],
      extraPlugins: 'justify,font,selectall',
      autoParagraph: false
    };
  }

  ngOnInit() {}
  onKeyUp(event: any) {
    this.data = event.target.innerHTML;
    this.onValueChange.emit(this.data);
  }
  onSingleClick(event: any) {
   this.IsDragDisabled.emit('true');
  }
  onDblClick(event: any) {
    this.IsDragDisabled.emit('false');
  }

}
