import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-cat-form',
  templateUrl: './create-cat-form.component.html',
  styleUrls: ['./create-cat-form.component.scss']
})
export class CreateCatFormComponent implements OnInit {

  @Output() submitCat:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  createCat(catModel: any, isValid: boolean) {
    this.submitCat.emit(catModel);
  }
}
