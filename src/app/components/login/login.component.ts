import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public invalidLogin: boolean = false;

  constructor(private router: Router, private http: HttpClient, private notification: NotificationService, private authService: AuthService) { }

  form = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
  }


  login() {
    console.log(this.form.value);
   this.authService.login(this.form.value).subscribe({
      next: (response) => {
        this.notification.showSuccess("User login successful", "Success");
        const token = (<any>response).token;
        const refreshToken = (<any>response).refreshToken;
        localStorage.setItem("access_token", token);
        localStorage.setItem("refresh_token", refreshToken);
        this.invalidLogin = false;
        this.router.navigate(["/"]);
      },
      error: (err) => {
        this.notification.showError("Invalid username or password.", "Error");
        console.error(err);
        this.invalidLogin = true;
      },
      complete: () => console.info('Login complete')
    });
  }

}
