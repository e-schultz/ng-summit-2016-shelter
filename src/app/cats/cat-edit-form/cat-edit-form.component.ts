import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, Self , OnChanges, ChangeDetectionStrategy, SimpleChanges} from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-cat-edit-form',
  templateUrl: './cat-edit-form.component.html',
  styleUrls: ['./cat-edit-form.component.scss']
})
export class CatEditFormComponent implements OnInit, OnDestroy, OnChanges {
  settingValue$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private catForm: FormGroup;
  @Input() cat: any;

  @Input() catBreeds: any;
  @Input() catAges: any;
  @Input() catGenders: any;
  @Input() isPending: boolean;
  @Output() submitCat: EventEmitter<any> = new EventEmitter<any>();
  @Output() catChange: EventEmitter<any> = new EventEmitter<any>();
  catFormSubscriber: any;
  constructor(private fb: FormBuilder) {

}



  ngOnChanges(changes: SimpleChanges) {
    
    let { cat } = changes;
    if (this.catForm && cat) {
      this.settingValue$.next(true);
      this.catForm.patchValue(cat.currentValue, {onlySelf: false});
      this.settingValue$.next(false);
    }

  }
  ngOnInit() {
    this.catForm = this.fb.group({
      id: [this.cat.id],
      imageUrl: [this.cat.imageUrl],
      name: [this.cat.name],
      headline: [this.cat.headline],
      description: [this.cat.description],
      breed: [this.cat.breed],
      age: [this.cat.age],
      gender: [this.cat.gender]
    });

    /* 
      Trying to prevent cyclic changes where updating the form from the state
      doesn't trigger things again.

      Not that happy with this.
      */
    this.catFormSubscriber = this.catForm
    .valueChanges
    .withLatestFrom(this.settingValue$, (value, setting) => ({value, setting}))
    .filter(n => n.setting === false)
    .subscribe(n => {

        this.catChange.emit(n.value);

    });
  }
  ngOnDestroy() {
    this.catFormSubscriber.unsubscribe();
  }

}
