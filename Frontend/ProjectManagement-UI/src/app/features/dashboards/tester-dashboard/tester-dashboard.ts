import { Component, OnInit } from '@angular/core';
import { BUGS, TASKS } from '../../../shared/mockData/mock-data';

@Component({
  selector: 'app-tester-dashboard',
  imports: [],
  templateUrl: './tester-dashboard.html',
  styleUrl: './tester-dashboard.css',
})
export class TesterDashboard implements OnInit {
 totalBugs = 0;

  pending = 0;

  passed = 0;

  failed = 0;

  bugs:any[] = [];

  testingTasks:any[] = [];


  ngOnInit(): void {

    this.loadData();

  }
loadData(): void {


  this.pending =
    BUGS.filter(
      x => x.status === 'pending'
    ).length;




  this.passed =
    BUGS.filter(
      x => x.status === 'passed'
    ).length;




  this.failed =
    BUGS.filter(
      x => x.status === 'failed'
    ).length;




  this.testingTasks =
    TASKS.filter(
      x =>
        x.status === 'review'
        ||
        x.status === 'in-progress'
    )
    .slice(0, 5);

}

}
