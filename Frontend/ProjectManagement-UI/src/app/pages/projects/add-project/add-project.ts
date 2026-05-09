import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ALL_SKILLS } from '../../../shared/mockData/mock-data';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {

  @Output()
  saveProject = new EventEmitter<any>();

  Skills=ALL_SKILLS;

  name='';
  description='';
  hours=200;

  
  closeModal(){
    this.saveProject.emit();
    console.log("Closing create project modal");
  }

  submit(){ 

    const project={

      id:Date.now(),

      name:this.name,

      description:this.description,

      estimatedHours:this.hours,

      progress:0

    };

    this.saveProject.emit(project);

  }
}
