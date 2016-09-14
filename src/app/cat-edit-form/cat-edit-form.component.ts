import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cat-edit-form',
  templateUrl: './cat-edit-form.component.html',
  styleUrls: ['./cat-edit-form.component.scss']
})
export class CatEditFormComponent implements OnInit, OnDestroy {

  @Input() cat: any;
  @Input() catBreeds: any;
  @Input() catAges: any;
  @Input() catGenders: any;

  @Output() submitCat: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  
  }

  ngOnDestroy() {
  }

}
