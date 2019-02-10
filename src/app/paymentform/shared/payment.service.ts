import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PReq } from './p-req';
import { Observable } from 'rxjs';

const configUrl = 'https://mutex.co.za/api/calc';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  calc(preq: PReq): Observable<PReq> {
    return this.http.post<PReq>(configUrl, preq);
  }

}
