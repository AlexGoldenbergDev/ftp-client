import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private serverAddressStorageKey = 'server_address';
  private serverAddressSubject = new Subject<string>();
  serverAddressChange$ = this.serverAddressSubject.asObservable();

  private serverPortStorageKey = 'server_port';
  private serverPortSubject = new Subject<string>();
  serverPortChange$ = this.serverPortSubject.asObservable();

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.triggerServerAddressChange();
  }

  public setServerAddress(serverAddress: string): void {
    this.storage.set(this.serverAddressStorageKey, serverAddress);
    this.triggerServerAddressChange();
  }

  public getServerAddress(): string {
    return this.storage.get(this.serverAddressStorageKey);
  }

  private triggerServerAddressChange(): void {
    this.serverAddressSubject.next(this.getServerAddress());
  }

  public setServerPort(serverPort: string): void {
    this.storage.set(this.serverPortStorageKey, serverPort);
    this.triggerServerPortChange();
  }

  public getServerPort(): string {
    return this.storage.get(this.serverPortStorageKey);
  }

  private triggerServerPortChange(): void {
    this.serverPortSubject.next(this.getServerPort());
  }

}
