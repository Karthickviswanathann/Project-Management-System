import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  EMPLOYEES,
  PROJECTS
} from '../../shared/mockData/mock-data';


@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams.html',
  styleUrls: ['./teams.css']
})
export class Teams {

  employees = EMPLOYEES;
  projects = PROJECTS;

  roleOrder = [
    'tl',
    'developer',
    'tester',
    'admin'
  ];

  roleLabels:any = {
    tl:'TEAM LEAD / COORDINATOR',
    developer:'DEVELOPER',
    tester:'TESTER',
    admin:'ADMIN'
  };


  get groupedTeams(){

    return this.roleOrder
      .map(role => ({
        role,
        members: this.employees.filter(
          x => x.role == role
        )
      }))
      .filter(
        x => x.members.length > 0
      );

  }


  loadStatus(util:number){

    if(util >= 85){

      return {
        label:'Overloaded',
        class:'overloaded'
      };

    }

    if(util >= 60){

      return {
        label:'Moderate',
        class:'moderate'
      };

    }

    return {
      label:'Available',
      class:'available'
    };

  }


  assignedHoursFor(empId:string){

    return this.projects.reduce(
      (sum, p)=>{

        const a =
          p.assignedTo.find(
            x => x.employeeId == empId
          );

        return sum + (a?.hours || 0);

      },
      0
    );

  }


  getInitials(name:string){

    return name
      .split(' ')
      .map(x=>x[0])
      .join('')
      .substring(0,2);

  }

}