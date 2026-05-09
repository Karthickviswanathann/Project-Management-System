import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BaseChartDirective
} from 'ng2-charts';

import {
  ChartConfiguration,
  ChartOptions,
  ChartType
} from 'chart.js';

import { PROJECTS, EMPLOYEES } from './../../shared/mockData/mock-data';

import { PageHeaderComponent } from '../../ui-elements/page-header';
import { StatCardComponent } from '../../ui-elements/stat-card';
import { StatusBadgeComponent } from '../../ui-elements/status-badge';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,

  imports: [
    CommonModule,
    BaseChartDirective,
    PageHeaderComponent,
    StatCardComponent,
    StatusBadgeComponent
  ],

  templateUrl: './admin-dashoard.html',
  styleUrls: ['./admin-dashoard.css']
})

export class AdminDashoard implements OnInit {

  totalProjects = 0;
  activeProjects = 0;
  avgUtil = 0;
  available = 0;

  overloaded: any[] = [];

  // =========================
  // DONUT CHART
  // =========================

public doughnutChartType = 'doughnut' as const;

  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Active', 'Planning', 'Completed', 'On Hold'],
    datasets: [
      {
        data: [45, 20, 20, 15],

        backgroundColor: [
          '#2563eb',
          '#9ca3af',
          '#16a34a',
          '#eab308'
        ],

        borderWidth: 0,

        hoverOffset: 4
      }
    ]
  };

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,

    cutout: '65%',

    plugins: {
      legend: {
        position: 'bottom',

        labels: {
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }
  };

  // =========================
  // BAR CHART
  // =========================

public barChartType = 'bar' as const;
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],

    datasets: [
      {
        label: 'Utilization %',
        data: [],
        backgroundColor: '#2563eb',
        borderRadius: 6
      },

      {
        label: 'Availability %',
        data: [],
        backgroundColor: '#16a34a',
        borderRadius: 6
      }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {

    responsive: true,

    plugins: {
      legend: {
        position: 'bottom'
      }
    },

    scales: {

      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 25
        }
      }

    }

  };

  ngOnInit(): void {
    this.calculateStats();
  }

  calculateStats() {

    this.totalProjects = PROJECTS.length;

    this.activeProjects = PROJECTS.filter(
      (p: any) => p.status === 'active'
    ).length;

    this.avgUtil = Math.round(
      EMPLOYEES.reduce(
        (s: number, e: any) => s + e.utilization,
        0
      ) / EMPLOYEES.length
    );

    this.available = EMPLOYEES.filter(
      (e: any) => e.availability >= 50
    ).length;

    // overloaded employees

    this.overloaded = EMPLOYEES.filter(
      (e: any) => e.utilization >= 85
    );

    // chart data

    const topEmployees = [...EMPLOYEES]
      .sort((a, b) => b.utilization - a.utilization)
      .slice(0, 8);

    this.barChartData.labels =
      topEmployees.map(e => e.name.split(' ')[0]);

    this.barChartData.datasets[0].data =
      topEmployees.map(e => e.utilization);

    this.barChartData.datasets[1].data =
      topEmployees.map(e => e.availability);

  }

}