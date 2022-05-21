import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public invalidRegister = false;
  constructor(private router: Router, private http: HttpClient, private notification: NotificationService) { }
  ngOnInit(): void {
  }

  public register = (form: NgForm) => {
    const registerModel = JSON.stringify(form.value);

    this.http.post(environment.baseUrl + "user/save", registerModel).subscribe({
      next: () => {
        this.invalidRegister = false;
        this.notification.showSuccess("New user registered successfully", "Success")
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        this.notification.showError("User already exists / register user failed", "Error")
        console.error(err)
        this.invalidRegister = true;
      },
      complete: () => console.info('Register complete')
    });
  }
}
