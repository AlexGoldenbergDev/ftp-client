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
import { MatInputModule   } from '@angular/material/input';
import { MatCardModule   } from '@angular/material/card';
import { MatRadioModule   } from '@angular/material/radio';
import { MatTableModule   } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { MatCheckboxModule   } from '@angular/material/checkbox';
import { HeaderComponent } from './header/header.component';

import { SidePanelComponent } from './sidepanel/side-panel.component';
import { UiStateService } from './ui-state.service';
import { SidePanelButtonComponent } from './sidepanel/sidepanel-button/sidepanel-button.component';
import { ExplorerComponent } from './content/explorer/explorer.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { SettingsComponent } from './content/settings/settings.component';
import { ExplorerControlPanelComponent } from './content/explorer/explorer-control-panel/explorer-control-panel.component';
import { ExplorerControlPanelButtonComponent } from './content/explorer/explorer-control-panel/explorer-control-panel-button/explorer-control-panel-button.component';
import { ExplorerSearchPanelComponent } from './content/explorer/explorer-search-panel/explorer-search-panel.component';
import { ExplorerTableComponent } from './content/explorer/explorer-table/explorer-table.component';
import { ExplorerNavComponent } from './content/explorer/explorer-nav/explorer-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidePanelComponent,
    SidePanelButtonComponent,
    ExplorerComponent,
    DashboardComponent,
    SettingsComponent,
    ExplorerControlPanelComponent,
    ExplorerControlPanelButtonComponent,
    ExplorerSearchPanelComponent,
    ExplorerTableComponent,
    ExplorerNavComponent
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
        MatInputModule,
        MatCardModule,
        MatRadioModule,
        MatTableModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        MatSortModule
    ],
  providers: [
    UiStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
