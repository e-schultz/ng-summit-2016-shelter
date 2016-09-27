import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cat-detail-card',
  templateUrl: './cat-detail-card.component.html',
  styleUrls: ['./cat-detail-card.component.scss']  
})
export class CatDetailCardComponent implements OnInit {

  @Input() cat: any;
  @Output() displayEdit: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteCat: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

}
