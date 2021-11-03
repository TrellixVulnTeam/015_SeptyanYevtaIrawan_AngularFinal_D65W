import { Injectable } from '@angular/core';
import { Cardinfo } from '../Models/cardinfo';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'https://septyanyevtairawan-final1.herokuapp.com/api/AuthManagement';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,private router: Router) { }

  login(user:User){
    return this.http.post<any>(`${this.endpoint}/login`, user).pipe(catchError(this.handleError)).subscribe((res:any) => {
        localStorage.setItem('access_token' , res.token)
        alert("SUKSES LOGIN")
        this.router.navigate(['home'])
    })
  }

  Register(user: User): Observable<any> {
    const api = `${this.endpoint}/register`;
    return this.http.post(api, user).pipe(catchError(this.handleError2))
  }
  getToken(){
    return localStorage.getItem('access_token')
  }
  getUser(){
    return localStorage.getItem('current_user')
  }


  get isLoggedIn(): boolean{
    let auth = localStorage.getItem('access_token');
    return (auth !== "") ? true : false
  }

  get isNotLogged(): boolean{
    let auth = localStorage.getItem('access_token');
    return (auth == "") ? true : false
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Email/Password Salah!`;
    }
    alert(msg)
    return throwError(msg)
  }
  handleError2(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `SALAH INPUT!`;
    }
    alert(msg)
    return throwError(msg)
  }
}
