import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getHomes$(): Observable<any> {
    return this.httpClient.get<any>('assets/homes.json');
  }

  bookHome$(): Observable<any> {
    return this.httpClient.post<any>(`https://run.mocky.io/v3/44c279cc-6e5e-445b-827e-33a8037533b2`, {});
  }
}
