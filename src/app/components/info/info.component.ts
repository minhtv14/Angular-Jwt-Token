import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  
  public user!: User[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(environment.baseUrl + "users", {
    }).subscribe({
      next: (response) => {
        this.user = response as User[];

        console.log(this.user);
      },
      error: (err) => {
        console.error(err)
      },
      complete: () => console.info('Address complete')
    });
  }

}
