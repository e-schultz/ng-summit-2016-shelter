import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MdCardModule } from '@angular2-material/card';
import { MdCoreModule } from '@angular2-material/core';
import { MdButtonModule } from '@angular2-material/button';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdInputModule } from '@angular2-material/input';
import { MdRadioModule } from '@angular2-material/radio';
import { MdCheckboxModule} from '@angular2-material/checkbox';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { rootReducer, IAppState } from './store';
import { HorizonService, CatsService } from './shared';
import { CreateCatFormComponent } from './create-cat-form/create-cat-form.component';
import { CatDetailCardComponent } from './cat-detail-card/cat-detail-card.component';
import { CatEditFormComponent } from './cat-edit-form/cat-edit-form.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateCatFormComponent,
    CatDetailCardComponent,
    CatEditFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdCheckboxModule.forRoot(),
    MdRadioModule.forRoot(),
    MdInputModule.forRoot(),
    MdCardModule.forRoot(),
    MdCoreModule.forRoot(),
    MdButtonModule.forRoot(),
    MdSidenavModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdGridListModule.forRoot(),
    NgReduxModule
  ],
  providers: [HorizonService, CatsService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private ngRedux: NgRedux<IAppState>, horizon: HorizonService) {
    ngRedux.configureStore(rootReducer, {});
    //horizon.connect();
  }
}
