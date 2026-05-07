import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PROJECTS, EMPLOYEES } from './../../shared/mockData/mock-data';
import { PageHeaderComponent } from '../../ui-elements/page-header';
import { StatCardComponent } from '../../ui-elements/stat-card';
import { StatusBadgeComponent } from '../../ui-elements/status-badge';
@Component({
  selector: 'app-admin-dashboard',
  imports: [PageHeaderComponent, StatCardComponent,StatusBadgeComponent, CommonModule ],
  standalone: true,
  templateUrl: './admin-dashoard.html',
  styleUrls: ['./admin-dashoard.css']

})
export class AdminDashoard implements OnInit{
 totalProjects = 0;
  activeProjects = 0;
  avgUtil = 0;
  available = 0;

  pieData: any[] = [];
  utilData: any[] = [];
  overloaded: any[] = [];



  ngOnInit(): void {
    this.calculateStats();
  }


   calculateStats() {

    this.totalProjects = PROJECTS.length;

    this.activeProjects = PROJECTS.filter((p: { status: string; }) => p.status === 'active').length;

    this.avgUtil = Math.round(
      EMPLOYEES.reduce((s: any, e: { utilization: any; }) => s + e.utilization, 0) / EMPLOYEES.length
    );

    this.available = EMPLOYEES.filter((e: { availability: number; }) => e.availability >= 50).length;

    // Pie data
    const statusCounts: any = {};
    PROJECTS.forEach((p: { status: string | number; }) => {
      statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
    });

    this.pieData = Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value
    }));

    // Bar chart data
    this.utilData = [...EMPLOYEES]
      .sort((a, b) => b.utilization - a.utilization)
      .slice(0, 8)
      .map(e => ({
        name: e.name.split(' ')[0],
        utilization: e.utilization,
        availability: e.availability
      }));

    // Overloaded employees
    this.overloaded = EMPLOYEES.filter((e: { utilization: number; }) => e.utilization >= 85);
  
  }
}



