import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    }
  );

  constructor(private http: HttpClient) { }

  login(data: any) {
    const body = new HttpParams({fromObject: data});
    console.log(body.toString());
    const options = { headers: this.headers};
    return this.http.post(environment.baseUrl + "login",
      body.toString(),options);
  }
}
