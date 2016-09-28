import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { CatDetailCardComponent } from './cats/cat-detail-card/cat-detail-card.component';
import { CatEditFormComponent } from './cats/cat-edit-form/cat-edit-form.component';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { CatFilterContainerComponent } from './cats/cat-filter-container/cat-filter-container.component';
import { CatFilterListComponent } from './cats/cat-filter-list/cat-filter-list.component';
import { CatShortListComponent } from './cats/cat-short-list/cat-short-list.component';
const persistState = require('redux-localstorage');


@NgModule({
  declarations: [
    AppComponent,
    CatDetailCardComponent,
    CatEditFormComponent,
    CatFilterContainerComponent,
    CatFilterListComponent,
    CatShortListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    const storage = persistState('', {
      key: 'shelter-cats',
      serialize: s => JSON.stringify(s),
      deserialize: s => JSON.parse(s),
    });
    let enhancers = [storage];
    const createCatEpic = createEpicMiddleware(catEpics.create);
    const updateCatEpic = createEpicMiddleware(catEpics.update);
    const catFormEpic = createEpicMiddleware(catEpics.updateCatForm);
    enhancers = devTools.isEnabled() ? [...enhancers, devTools.enhancer()] : [...enhancers];

    ngRedux.configureStore(rootReducer, {}, [...middleware, createCatEpic, updateCatEpic, catFormEpic], [...enhancers]);
  }
}
