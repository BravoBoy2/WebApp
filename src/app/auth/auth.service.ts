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
}
