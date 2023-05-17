import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl:any;
  resUrl :any;

  constructor(private http:HttpClient,private snackbar:MatSnackBar) {
    this.baseUrl = "http://localhost:8800/api";
    this.resUrl = "https://my-json-server.typicode.com/jainpiyus/redtheme-database-json";
  }

  postData(data,from): Observable<any> {
    return this.http.post<any>(this.baseUrl + from, data)
  }
  getAllRestaurants(from): Observable<any> {
    return this.http.get<any>(this.resUrl + from);
  }


}
