import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCountryInfo(countryCode: string) {
    let api = `https://api.worldbank.org/v2/country/${countryCode}?format=json`
    
    return this.http.get(api)
  }

  setCountryInfo(countryCode: string) {
    let subject = new Subject();
    
    this.getCountryInfo(countryCode).subscribe((data: any) => {
      subject.next({
        country: data[1][0].name,
        capital: data[1][0].capitalCity,
        incomeLevel: data[1][0].incomeLevel.value,
        longitude: data[1][0].longitude,
        latitude: data[1][0].latitude,
        region: data[1][0].region.value,
      })
    })

    return subject.asObservable();
  }
}
