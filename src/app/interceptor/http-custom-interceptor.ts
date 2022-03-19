import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';


@Injectable({
  providedIn: 'root'
})
export class HttpCustomInterceptor implements HttpInterceptor {

  constructor(private _loader: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    this._loader.isLoading.next(true);

    req = req.clone({
      withCredentials: true
    });
    return next.handle(req).pipe(
      finalize(
        () => {
          this._loader.isLoading.next(false);
        }
      )
    );
  }
}
