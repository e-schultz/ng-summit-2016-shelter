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
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';
import { rootReducer, IAppState, middleware, CatEpics } from './store';
import { createEpicMiddleware } from 'redux-observable';
import { HorizonService, CatsService, AgesService, BreedsService, GendersService } from './shared';
import { CatDetailCardComponent } from './cat/cat-detail-card/cat-detail-card.component';
import { CatEditFormComponent } from './cat/cat-edit-form/cat-edit-form.component';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { CatFilterContainerComponent } from './cat/cat-filter-container/cat-filter-container.component';
import { CatFilterListComponent } from './cat/cat-filter-list/cat-filter-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CatDetailCardComponent,
    CatEditFormComponent,
    CatFilterContainerComponent,
    CatFilterListComponent
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
    MdProgressCircleModule.forRoot(),
    NgReduxModule
  ],
  providers: [HorizonService, CatsService, AgesService, BreedsService, GendersService, CatEpics],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<IAppState>,
    horizon: HorizonService,
    devTools: DevToolsExtension,
    catEpics: CatEpics) {

    const createCatEpic = createEpicMiddleware(catEpics.create);
    const updateCatEpic = createEpicMiddleware(catEpics.update);
    let enhancers = devTools.isEnabled() ? [devTools.enhancer()] : [];
    console.log('yo!', rootReducer);
    ngRedux.configureStore(rootReducer, {}, [...middleware, createCatEpic, updateCatEpic], [...enhancers]);
  }
}
