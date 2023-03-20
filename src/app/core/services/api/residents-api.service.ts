import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resident } from '../../models/resident.model';

@Injectable({
  providedIn: 'root',
})
export class ResidentsApiService {
  constructor(private http: HttpClient) {}

  getResident(residentUrl: string): Observable<Resident> {
    const url = residentUrl;

    return this.http.get<Resident>(url);
  }
}
