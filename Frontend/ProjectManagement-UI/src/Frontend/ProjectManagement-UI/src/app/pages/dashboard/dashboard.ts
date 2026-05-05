import { Component } from '@angular/core';
import { AuthService } from '../../Core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
   constructor(
    public authService: AuthService
  ) { }

  get user(){
    return this.authService.user;
  }
}
