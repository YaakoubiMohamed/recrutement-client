import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  user: any;

  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    console.log("logged in",this.isLoggedIn);
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    console.log("user",this.user);
  }

}
