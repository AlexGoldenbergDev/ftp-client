/* tslint:disable:no-string-literal */
import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {TextInputSetting} from './content/settings/TextInputSetting';
import {MatTableDataSource} from '@angular/material/table';
import {TextInputType} from './content/settings/TextInputType';
import {CookiesService} from './cookies.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  readonly inputTableColumns: string[] = ['Name', 'Value', 'Controls'];

  private readonly serverAddress: TextInputSetting;
  private readonly serverPort: TextInputSetting;
  private readonly userId: TextInputSetting;



  constructor(private localStorageService: LocalStorageService, private cookieService: CookiesService) {
    this.serverAddress = this.createServerAddressSetting();
    this.serverAddress.triggerValueChange();
    this.serverPort = this.createServerPortSetting();
    this.serverPort.triggerValueChange();
    this.userId = this.createUserIdSetting();
    this.userId.triggerValueChange();
  }

  createServerAddressSetting(): TextInputSetting {
    return new TextInputSetting( 'Server Address', TextInputType.TEXT, 'Write server address',
      'localhost', this.localStorageService.getServerAddress(),
      this.localStorageService.serverAddressChange$, (value: string, defaultValue: string) => {
        this.localStorageService.setServerAddress((!value || value.trim().length === 0) ? defaultValue : value);
      });
  }

  createServerPortSetting(): TextInputSetting {
    return new TextInputSetting( 'Server Port', TextInputType.NUMBER, 'Write server port',
      '8080', this.localStorageService.getServerPort(),
      this.localStorageService.serverPortChange$, (value: string, defaultValue: string) => {
        this.localStorageService.setServerPort((!value || value.trim().length === 0) ? defaultValue : value);
      });
  }

  createUserIdSetting(): TextInputSetting {
    return new TextInputSetting( 'User ID', TextInputType.TEXT, 'Write user ID',
      '', this.cookieService.getUserId(),
      this.cookieService.userIdChange$, (value: string, defaultValue: string) => {
        this.cookieService.setUserId((!value || value.trim().length === 0) ? defaultValue : value);
      });
  }

  getGeneralSettingsDataSource(): MatTableDataSource<TextInputSetting> {
    return new MatTableDataSource<TextInputSetting>([this.serverAddress, this.serverPort]);
  }

  getIdentificationSettingsDataSource(): MatTableDataSource<TextInputSetting> {
    return new MatTableDataSource<TextInputSetting>([this.userId]);
  }

  getServerSettings(): { [index: string]: MatTableDataSource<any>; } {
    const r: { [index: string]: MatTableDataSource<any>; } = {};

    r['General'] = this.getGeneralSettingsDataSource();

    return r;

  }

  getInputTableColumns(): { [index: string]: string[]; } {
    const r: { [index: string]: string[]; } = {};

    r['General'] = this.inputTableColumns;
    r['Identification'] = this.inputTableColumns;

    return r;

  }


  getUserSettings(): { [index: string]: MatTableDataSource<any>; } {
    const r: { [index: string]: MatTableDataSource<any>; } = {};

    r['Identification'] = this.getIdentificationSettingsDataSource();

    return r;

  }
}
