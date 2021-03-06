import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {EditorComponent} from './editor/editor.component';
import {CTALinkService} from './editor/ctaLink/cloakLink.service';

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
  providers: [CTALinkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
