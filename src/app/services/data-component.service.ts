import { Injectable } from '@angular/core';
import { Cardinfo } from '../Models/cardinfo';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataComponentService {

  endpoint: string = 'https://septyanyevtairawan-final1.herokuapp.com/api/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }


  addData(user: Cardinfo): Observable<any> {
    const api = `${this.endpoint}PaymentsDetails`;
    return this.http.post(api, user).pipe(catchError(this.handleError))
  }

  getData(): Observable<any> {
    const api = `${this.endpoint}PaymentsDetails`;
    console.log(api)
    return this.http.get(api).pipe(
      map((res: any) => {
        return res || {}
      }), catchError(this.handleError)
    )
  }

  deleteData(id: number): Observable<any> {
    const api = `${this.endpoint}PaymentsDetails/${id}`;
    alert("Sukses Deleted")
    return this.http.delete(api, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  getDataById(id:number): Observable<any>{
    const api = `${this.endpoint}PaymentsDetails/${id}`;
    return this.http.get(api).pipe(
      map((res)=>{
        console.log(res)
        return res  || {}
      }),catchError(this.handleError)
    )
  }

  updateData(user: Cardinfo,id:number): Observable<any>{
    const api = `${this.endpoint}PaymentsDetails/${id}`;
    return this.http.put(api, user).pipe( catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    alert(msg)
    return throwError(msg)
  }
}
