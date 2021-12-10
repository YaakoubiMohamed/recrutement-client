import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
  }

  delete(){
    this.authService.deleteProfile(this.user.uid);
  }

}
