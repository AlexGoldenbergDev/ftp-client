import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule  } from '@angular/material/toolbar';
import { MatIconModule     } from '@angular/material/icon';
import { MatSidenavModule  } from '@angular/material/sidenav';
import { MatListModule     } from '@angular/material/list';
import { MatButtonModule   } from '@angular/material/button';

import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { SidePanelComponent } from './sidepanel/side-panel.component';

import { UiStateService } from './ui-state.service';
import { SidePanelButtonComponent } from './sidepanel/sidepanel-button/sidepanel-button.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    SidePanelComponent,
    SidePanelButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [
    UiStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
