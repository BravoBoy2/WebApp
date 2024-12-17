import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}
  fetchData(apiRoute: string, formData: any): Observable<any> {
    const url = `/api/${apiRoute}`;
    return this.http.post<Observable<any>>(url, formData);
  }

  isLoggedIn() : boolean {
    /* Check if the user is currently logged in
     This logic depends on how you handle authentication
     in your application */
    const token = localStorage.getItem('token');
    // Convert token to boolean (true if token exists, false otherwise)
    return !!token;
  }
}
