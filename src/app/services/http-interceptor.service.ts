import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent,HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
    });


    const cloneReq = req.clone({headers});

    return next.handle(cloneReq);

    return next.handle(req);
  }
  // intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
  //   const authToken = this.authService.getToken
  //   req = req.clone({
  //     setHeaders:{
  //       'Authorization': `Bearer ${authToken}`
        
  //     }
  //   })
  //   return next.handle(req)
  // }

}
