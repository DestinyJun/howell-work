import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LocalStorageService} from '../shared/local-storage.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor (private localSessionStorage: LocalStorageService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.localSessionStorage.get('loginName')) {
      console.log(this.localSessionStorage);
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }

  }
 /* canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return false;
  }*/
}
