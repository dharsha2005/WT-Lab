import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PoultryService {
  private apiUrl = 'http://localhost:3000/poultry'; // Backend API URL

  constructor(private http: HttpClient) {}

  savePoultryData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}