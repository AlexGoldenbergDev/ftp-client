import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  private userIdCookieKey = 'userId';
  private userIdSubject = new Subject<string>();
  userIdChange$ = this.userIdSubject.asObservable();


  constructor(private cookieService: CookieService) { }

  public setUserId(serverAddress: string): void {
    this.cookieService.set(this.userIdCookieKey, serverAddress);
    this.triggerUserIdChange();
  }

  public getUserId(): string {
    return this.cookieService.get(this.userIdCookieKey);
  }

  private triggerUserIdChange(): void {
    this.userIdSubject.next(this.getUserId());
  }
}
