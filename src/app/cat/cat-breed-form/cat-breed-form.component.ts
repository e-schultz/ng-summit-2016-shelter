import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-cat-breed-form',
  templateUrl: './cat-breed-form.component.html',
  styleUrls: ['./cat-breed-form.component.scss']
})
export class CatBreedFormComponent implements OnInit {

  @Input() breed: any;
  @Output() submitBreed: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  
  }

}
