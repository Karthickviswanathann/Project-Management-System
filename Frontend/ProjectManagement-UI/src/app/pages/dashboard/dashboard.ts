import { Component } from '@angular/core';
import { AuthService } from '../../Core/services/auth.service';
import { DeveloperDashboard } from '../../features/dashboards/developer-dashboard/developer-dashboard';
import { TesterDashboard } from '../../features/dashboards/tester-dashboard/tester-dashboard';
import { AdminDashoard } from '../../features/dashboards/admin-dashoard';
import { TLDashboard } from '../../features/dashboards/tldashboard/tldashboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DeveloperDashboard, TesterDashboard, AdminDashoard,TLDashboard,CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
   constructor(
    public authService: AuthService
  ) { }

  get user(){
    return this.authService.user;
  }
}
