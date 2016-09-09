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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdCardModule.forRoot(),
    MdCoreModule.forRoot(),
    MdButtonModule.forRoot(),
    MdSidenavModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdGridListModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
