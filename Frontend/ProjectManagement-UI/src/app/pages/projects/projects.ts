import { Component } from '@angular/core';
import { PROJECTS } from '../../shared/mockData/mock-data';
import { AddProject } from './add-project/add-project';
import { ProjectDetails } from './project-details/project-details';

@Component({
  selector: 'app-projects',
  imports: [AddProject, ProjectDetails],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
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
