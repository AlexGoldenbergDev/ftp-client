import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule   } from '@angular/material/checkbox';

import { HeaderComponent } from './header/header.component';
import { SidePanelComponent } from './sidepanel/side-panel.component';
import { ExplorerUiStateService } from './explorer-ui-state.service';
import { SidePanelButtonComponent } from './sidepanel/sidepanel-button/sidepanel-button.component';
import { ExplorerComponent } from './content/explorer/explorer.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { SettingsComponent } from './content/settings/settings.component';
import { ExplorerControlPanelComponent } from './content/explorer/explorer-control-panel/explorer-control-panel.component';
import { ExplorerControlPanelButtonComponent } from './content/explorer/explorer-control-panel/explorer-control-panel-button/explorer-control-panel-button.component';
import { ExplorerSearchPanelComponent } from './content/explorer/explorer-search-panel/explorer-search-panel.component';
import { ExplorerTableComponent } from './content/explorer/explorer-table/explorer-table.component';
import { ExplorerNavComponent } from './content/explorer/explorer-nav/explorer-nav.component';
import { FuncSidePanelComponent } from './func-side-panel/func-side-panel.component';
import {FormsModule} from '@angular/forms';
import { FuncSidePanelUploadComponent } from './func-side-panel/func-side-panel-upload/func-side-panel-upload.component';
// tslint:disable-next-line:max-line-length
import { FuncSidePanelCreateFolderComponent } from './func-side-panel/func-side-panel-create-folder/func-side-panel-create-folder.component';
import { FuncSidePanelDeleteComponent } from './func-side-panel/func-side-panel-delete/func-side-panel-delete.component';
import {FuncSidePanelFileTicketComponent} from './func-side-panel/func-side-panel-file-ticket/func-side-panel-file-ticket.component';
import {UserService} from './user.service';
import { CookieService } from 'ngx-cookie-service';
import {LocalStorageService} from './local-storage.service';
import {MatTabsModule} from '@angular/material/tabs';
import { ServerSettingsComponent } from './content/settings/server-settings/server-settings.component';
import { InputSettingsComponent } from './content/settings/server-settings/server-general-settings/input-settings.component';
import { UserSettingsComponent } from './content/settings/user-settings/user-settings.component';


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
    ExplorerNavComponent,
    FuncSidePanelComponent,
    FuncSidePanelUploadComponent,
    FuncSidePanelCreateFolderComponent,
    FuncSidePanelDeleteComponent,
    FuncSidePanelFileTicketComponent,
    ServerSettingsComponent,
    InputSettingsComponent,
    UserSettingsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
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
        MatSortModule,
        MatFormFieldModule,
        MatProgressBarModule,
        FormsModule,
        MatTabsModule
    ],
  providers: [
    ExplorerUiStateService,
    UserService,
    CookieService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
