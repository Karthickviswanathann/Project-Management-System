// allocation.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  EMPLOYEES,
  PROJECTS,
  ALL_SKILLS
} from '../../shared/mockData/mock-data';
import { Project } from '../../shared/mockData/types';

@Component({
  selector: 'app-allocation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './allocation.html',
  styleUrls: ['./allocation.css']
})
export class Allocation {

  projects = PROJECTS;

  employees = EMPLOYEES;

  allSkills = ALL_SKILLS;

  selectedProjectId = this.projects[0].id;



  selectedEmployees:any[]=[];
  showDropdown = false;
  showRoleDropdown = false;
  showSkillDropdown = false;
  showLoadDropdown=false;
  allocationConfirmed = false;

  roles = [
    { value:'all', label:'All roles' },
    { value:'developer', label:'Developer' },
    { value:'tester', label:'Tester' },
    { value:'tl', label:'Team Lead' }
  ];


  loads = [
    { value:'Skill Match', label:'Skill Match' },
    { value:'WorkLoad', label:'WorkLoad' }
  ];


    roleFilter = 'all';
    loadFilter = this.loads[0].value; 
    skillFilter = 'all';
  get roleFilterLabel(){

    return this.roles.find(
      x => x.value == this.roleFilter
    )?.label;

  }


   get loadFilterLabel(){

    return this.loads.find(
      x => x.value == this.loadFilter
    )?.label;

  }

  selectRole(role:any){

    this.roleFilter = role.value;
    this.showRoleDropdown = false;

  }


  selectProjectCondition(Load:any){

    this.loadFilter = Load.value;
    this.showLoadDropdown = false;

  }

  selectSkill(skill:string){

    this.skillFilter = skill;
    this.showSkillDropdown = false;

  }

get totalAllocatedHours(){

  return this.selectedEmployees.reduce(
    (sum, emp)=> sum + Number(emp.hours || 0),
    0
  );

}
  

get selectedProject(): Project {

  return this.projects.find(
    x => x.id == this.selectedProjectId
  )!;

}

selectProject(project:any){
  this.selectedProjectId = project.id;
  this.showDropdown = false;
}


  get filteredEmployees(){

    return this.employees
      .filter(emp => {

        const roleMatch =
          this.roleFilter === 'all'
          || emp.role === this.roleFilter;

        const skillMatch =
          this.skillFilter === 'all'
          || emp.skills.includes(this.skillFilter);

        return roleMatch && skillMatch;

      })
      .map(emp => {

        const matched =
          emp.skills.filter((s:string)=>
            this.selectedProject.requiredSkills.includes(s)
          );

        const score =
          Math.round(
            (matched.length /
            this.selectedProject.requiredSkills.length) * 70
          )
          + Math.round((emp.availability / 100) * 30);

        return {
          ...emp,
          score
        };

      })
      .sort((a,b)=>b.score-a.score);

  }

  getInitials(name:string){

    return name
      .split(' ')
      .map(x=>x[0])
      .join('')
      .substring(0,2);

  }

  getAvailability(value:number){

    if(value >= 60){
      return 'high';
    }

    if(value >= 30){
      return 'medium';
    }

    return 'low';

  }

  toggleEmployee(emp:any){

    const exists =
      this.selectedEmployees.find(x=>x.id===emp.id);

    if(exists){

      this.selectedEmployees =
        this.selectedEmployees.filter(x=>x.id!==emp.id);

    }
    else{

      this.selectedEmployees.push({
        ...emp,
        hours:40
      });

    }

  }

  removeEmployee(emp:any){

    this.selectedEmployees =
      this.selectedEmployees.filter(x=>x.id!==emp.id);

  }

  isSelected(emp:any){

    return !!this.selectedEmployees.find(
      x=>x.id===emp.id
    );

  }

  confirmAllocation(){

    alert('Allocation Confirmed');
  this.allocationConfirmed = true;

  }

}