import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enviroment';
import { Transaction } from '../../interface/admin/transaction';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiURL = `${environment.APIUrl}/transactions`
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { 

  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiURL, { headers: this.headers });
  }

}
