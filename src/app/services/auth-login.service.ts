import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseAuth } from '../interface/response-auth';
import { environment } from '../enviroment';
import { Observable } from 'rxjs';
import { Admin } from '../interface/users/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  private apiURL = `${environment.APIUrl}/login`
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { 
  }

  postLoginAuth(user: Admin) : Observable<ResponseAuth> {
    return this.http.post<ResponseAuth>(this.apiURL, user, { headers: this.headers })
  }
}
