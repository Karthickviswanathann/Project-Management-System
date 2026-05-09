import { Component } from '@angular/core';
import { PROJECTS } from '../../shared/mockData/mock-data';
import { AddProject } from './add-project/add-project';
import { ProjectDetails } from './project-details/project-details';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  imports: [AddProject, ProjectDetails,CommonModule, FormsModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class Projects {

  projects = [...PROJECTS];

  selectedProject:any=null;

  createModal=false;
  detailsModal=false;

  openCreate(){
    console.log("Opening create project modal");
    this.createModal=true;
  }

  openDetails(project:any){
    this.selectedProject=project;
    this.detailsModal=true;
  }

 addProject(project: any) {

  if(project){
    this.projects.unshift(project);
  }

  console.log("Project added:", this.createModal);
  this.createModal = false;
}
  
}
