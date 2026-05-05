import { Component } from '@angular/core';
import { PROJECTS } from '../../shared/mockData/mock-data';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {

  projects = [...PROJECTS];

  selectedProject:any=null;

  createModal=false;
  detailsModal=false;

  openCreate(){
    this.createModal=true;
  }

  openDetails(project:any){
    this.selectedProject=project;
    this.detailsModal=true;
  }

  addProject(project:any){
    this.projects.unshift(project);

    this.createModal=false;
  }
  
}
