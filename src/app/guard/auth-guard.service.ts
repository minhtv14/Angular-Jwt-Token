import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private router: Router, private http: HttpClient, private notification: NotificationService) { }

  async canActivate() {
    const token = localStorage.getItem("access_token");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    const isRefreshSuccess = await this.refreshingTokens(token);

    if (!isRefreshSuccess) {
      this.router.navigate(["login"]);
    }

    return isRefreshSuccess;

  }

  private async refreshingTokens(token: String | null): Promise<boolean> {
    const refreshToken: String | null = localStorage.getItem("refresh_token");

    if (!token || !refreshToken) {
      return false;
    }

    const tokenModel = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

    let isRefreshSuccess: boolean;

    try {
      const response = await lastValueFrom(this.http.post(environment.baseUrl + "token/refresh", tokenModel));
      const newToken = (<any>response).accessToken;
      const newRefreshToken = (<any>response).refreshToken;
      localStorage.setItem("access_token", newToken);
      localStorage.setItem("refresh_token", newRefreshToken);
      this.notification.showSuccess("Token renewed successfully", "Success");
      isRefreshSuccess = true;
    } catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }

}
