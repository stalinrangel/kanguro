import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserStorageService } from '../services/user-storage.service';
import { Router } from '@angular/router';
//import { IdentityService } from '../services/identity.service';
//import { ToastService } from '../services/toast.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private uss: UserStorageService, private router: Router, /*private is: IdentityService, private t: ToastService*/) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status===401) {
          this.uss.destroy();
              this.router.navigate(['login']);
          /*let self=this;
          this.is.refresh(this.uss.acces_token).subscribe({
            next(data){
              console.log(data);
            },error(err){
              console.log(err);
              self.t.showError('Token expirado');
              this.uss.destroy();
              this.router.navigate(['login']);
            }
          })*/
        }
        return throwError(error);
      })
    );
  }
}
