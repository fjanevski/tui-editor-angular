import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {EditorComponent} from './editor/editor.component';
import {CloakLinkService} from './editor/cloakLink/cloakLink.service';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CloakLinkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
