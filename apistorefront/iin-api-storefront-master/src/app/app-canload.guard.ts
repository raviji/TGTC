import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DataListService } from './shared/services/data-list.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CanShowPage implements CanLoad, CanActivate {
  constructor(
      private service: DataListService,
      private route: Router
    ) {}

  checkAuthentication(path: string): boolean|Observable<boolean> {
    return this.service.check().pipe(
      map((response) => {
        if (!response.success) {
          this.route.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }

  canLoad(route: Route): boolean|Observable<boolean> {
    console.log('-----------------------------------------');
    console.log(JSON.stringify(route));
    console.log('-----------------------------------------');
    return this.checkAuthentication(route.path);
  }

  canActivate(activatedRouter: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean|Observable<boolean> {
    console.log('-----------------------------------------');
    console.log(JSON.stringify(activatedRouter.routeConfig));
    console.log('-----------------------------------------');
    return this.checkAuthentication(activatedRouter.routeConfig.path);
  }
}
