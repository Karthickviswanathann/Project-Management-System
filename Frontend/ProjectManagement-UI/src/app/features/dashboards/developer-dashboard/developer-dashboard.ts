import { Component, OnInit } from '@angular/core';
import { EMPLOYEES, TASKS } from '../../../shared/mockData/mock-data';
import { AuthService } from '../../../Core/services/auth.service';
import { StatCardComponent } from '../../../ui-elements/stat-card';
import { PageHeaderComponent } from '../../../ui-elements/page-header';
import { StatusBadgeComponent } from '../../../ui-elements/status-badge';

@Component({
  selector: 'app-developer-dashboard',
  imports: [StatCardComponent,PageHeaderComponent,StatusBadgeComponent],
  standalone: true,
  templateUrl: './developer-dashboard.html',
  styleUrl: './developer-dashboard.css',
})
export class DeveloperDashboard implements OnInit{
 user: any;
  
   firstName:any;

  empId = '';

  myTasks: any[] = [];

  open = 0;

  inProgress = 0;

  done = 0;

  sortedTasks: any[] = [];

  today = new Date('2026-04-27');


  constructor(
    private authService: AuthService
  ) { }


  ngOnInit(): void {

    this.user =
      this.authService.user;

    this.loadTasks();

  }



  loadTasks(): void {

    // find employee

    const match =
      EMPLOYEES.find(
        x => x.name === this.user?.name
      );

 
    this.empId =
      match?.id || 'e1';



    // employee tasks

    this.myTasks =
      TASKS.filter(
        x => x.assigneeId === this.empId
      );



    // open tasks

    this.open =
      this.myTasks.filter(
        x => x.status !== 'done'
      ).length;



    // in progress

    this.inProgress =
      this.myTasks.filter(
        x => x.status === 'in-progress'
      ).length;



    // done

    this.done =
      this.myTasks.filter(
        x => x.status === 'done'
      ).length;



    // sort by due date

    this.sortedTasks =
      [...this.myTasks].sort(
        (a, b) =>
          new Date(a.dueDate).getTime()
          -
          new Date(b.dueDate).getTime()
      );

  }

}
