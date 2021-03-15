import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userIdCookieKey = 'userId';

  constructor(private cookieService: CookieService) { }


  private setUserIdCookie(userId: string): void {
    this.cookieService.set(this.userIdCookieKey, userId);
  }


  private getUserIdCookie(): string {
    return this.cookieService.get(this.userIdCookieKey);
  }



}
