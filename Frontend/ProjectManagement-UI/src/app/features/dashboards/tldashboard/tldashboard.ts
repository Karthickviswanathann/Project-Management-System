import { Component, OnInit } from '@angular/core';
import { EMPLOYEES, PROJECTS, TASKS } from '../../../shared/mockData/mock-data';
import { PageHeaderComponent } from '../../../ui-elements/page-header';

@Component({
  selector: 'app-tl-dashboard',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './tldashboard.html',
  styleUrls: ['./tldashboard.css'],
})

export class TLDashboard
implements OnInit {

  team:any[] = [];

  teamTasks:any[] = [];

  riskProjects:any[] = [];

  timelineProjects:any[] = [];

  today =
    new Date('2026-04-27');

  minDate = 0;

  maxDate = 0;

  range = 0;


  ngOnInit(): void {

    this.loadData();

  }



  loadData(): void {

    // team members

    this.team =
      EMPLOYEES
      .filter(
        x =>
          x.role === 'developer'
          ||
          x.role === 'tester'
      )
      .slice(0,6);




    // team ids

    const teamIds =
      new Set(
        this.team.map(
          x => x.id
        )
      );




    // team tasks

    this.teamTasks =
      TASKS.filter(
        x =>
          teamIds.has(
            x.assigneeId
          )
      );




    // risky projects

    this.riskProjects =
      PROJECTS
      .filter(
        x =>
          x.status === 'active'
      )
      .map(
        x => ({

          ...x,

          daysLeft:
            this.getDaysLeft(
              x.deadline
            )

        })
      )
      .sort(
        (a,b) =>
          a.daysLeft
          -
          b.daysLeft
      )
      .slice(0,4);




    // timeline

    this.timelineProjects =
      PROJECTS
      .filter(
        x =>
          x.status === 'active'
      )
      .slice(0,5);




    this.minDate =
      this.today.getTime();



    this.maxDate =
      Math.max(
        ...this.timelineProjects.map(
          x =>
            new Date(
              x.deadline
            ).getTime()
        )
      );



    this.range =
      this.maxDate
      -
      this.minDate;

  }




  getDaysLeft(
    deadline:string
  ): number {

    const end =
      new Date(
        deadline
      ).getTime();


    const today =
      this.today.getTime();


    const diff =
      end - today;


    return Math.floor(
      diff /
      (1000*60*60*24)
    );

  }




  getOpenTasks(
    empId:string
  ): number {

    return this.teamTasks.filter(

      x =>
        x.assigneeId === empId
        &&
        x.status !== 'done'

    ).length;

  }




  getTimelineWidth(
    deadline:string
  ): number {

    const end =
      new Date(
        deadline
      ).getTime();


    const pct =
      ((end-this.minDate)
      /
      this.range)
      *100;


    return Math.max(
      8,
      pct
    );

  }

}
