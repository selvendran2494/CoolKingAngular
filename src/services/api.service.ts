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

  constructor(private http:HttpClient,private snackbar:MatSnackBar) {
    this.baseUrl = "http://localhost:8800/api";
  }

  postData(data,from): Observable<any> {
    return this.http.post<any>(this.baseUrl + from, data)
  }
  getAllServiceCenter(from):Observable<any> {
    return this.http.get<any>(this.baseUrl + from);
  }
  getServiceCenterbyId(from,id):Observable<any> {
    return this.http.get<any>(this.baseUrl + from + id);
  }
  getAllSlots(from):Observable<any> {
    return this.http.get<any>(this.baseUrl + from);
  }
  createAppointment(data,from): Observable<any> {
    return this.http.post<any>(this.baseUrl + from, data)
  }
  getSlotdetailsById(from,id):Observable<any> {
    return this.http.get<any>(this.baseUrl + from + id);
  }
  deleteServiceCenterById(from,id):Observable<any> {
    return this.http.delete<any>(this.baseUrl + from + id);
  }
  updateServiceCenterDetails(data,from,id):Observable<any> {
    return this.http.put<any>(this.baseUrl + from + id, data);
  }




}
