import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://lunch-api-8ff4b.firebaseapp.com/api/'

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    getServerDate() : Observable<Date>{
        return this.http.get<Date>(API_URL + 'serverDate');
    }

}