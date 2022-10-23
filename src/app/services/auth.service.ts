import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://core.nekta.cloud/api/auth/login'

  constructor(private http: HttpClient) { }

  proceedLogin(userData: any) {    
    return this.http.post(this.apiUrl, userData).pipe(catchError(this.handleError))    
  }

  private handleError(error: HttpErrorResponse) {    
    return throwError(() => error)
  }

  isLoggedIn(){
    return localStorage.getItem('token') != null
  }

  getToken() {
    return localStorage.getItem('token') || ''
  }
}
