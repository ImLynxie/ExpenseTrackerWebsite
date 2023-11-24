import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Expense} from "../expense";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseApiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<any[]> {
    return this.http.get<any[]>(this.baseApiUrl + "/expenses")
  }

  saveNewExpense(expense: Expense): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + "/expense", expense);
  }
}
