import { NgModule } from '@angular/core';
import { CatDetailCardComponent } from './cat-detail-card/cat-detail-card.component';
import { CatEditFormComponent } from './cat-edit-form/cat-edit-form.component';
import { CatFilterContainerComponent } from './cat-filter-container/cat-filter-container.component';
import { CatFilterListComponent } from './cat-filter-list/cat-filter-list.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [ 
    SharedModule
  ],
declarations: [
  CatDetailCardComponent,
  CatEditFormComponent,
  CatFilterContainerComponent,
  CatFilterListComponent
  ]
})
export class CatsModule {

}
