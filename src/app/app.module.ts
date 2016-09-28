import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';
import { rootReducer, IAppState, middleware, CatEpics } from './store';
import { createEpicMiddleware } from 'redux-observable';
import { HorizonService, CatsService, AgesService, BreedsService, GendersService } from './shared';
import { CatDetailCardComponent } from './cats/cat-detail-card/cat-detail-card.component';
import { CatEditFormComponent } from './cats/cat-edit-form/cat-edit-form.component';
import { CatFilterContainerComponent } from './cats/cat-filter-container/cat-filter-container.component';
import { CatFilterListComponent } from './cats/cat-filter-list/cat-filter-list.component';
import { CatShortListComponent } from './cats/cat-short-list/cat-short-list.component';
import { MaterialModule } from '@angular/material';
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
    MaterialModule.forRoot(),
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
