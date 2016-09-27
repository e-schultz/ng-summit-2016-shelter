import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ICats, ICodeTable } from '../../store';
import 'rxjs/add/operator/combineLatest';
@Component({
  selector: 'app-cat-short-list',
  templateUrl: './cat-short-list.component.html',
  styleUrls: ['./cat-short-list.component.scss']
})
export class CatShortListComponent implements OnInit {
  breedsMap$: Observable<any>;
  shortList$: Observable<string[]>;
  @Input() cats: Observable<ICats>;
  @Input() breeds: Observable<ICodeTable>;

  constructor() { }

  ngOnInit() {
    /*
      Breeds are being passed in as an array of [{id: string, value: string}],
      to easily get to the string value for an id, we are going to convert it 
      to a map of 
      { a: 'b',
        c: 'd'
      }
      This transformation should only be called if the breeds slice of state actually changes.
    */
    this.breedsMap$ = this.breeds
    .map(breeds => R.mergeAll(breeds.map(breed => {
      return { [breed.id] : breed.label };
    })));

    /*
      Even though there is some logic going on here, it is only relying on state
      that has been passed into the component. 

      It is not accessing state from anywhere else.
    */
    this.shortList$ = this.cats
      .combineLatest(this.breedsMap$,
      (cats, breedsMap) => cats.map(cat => `${cat.name} - ${breedsMap[cat.breed]}`));

  }

}
