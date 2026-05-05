import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-project',
  imports: [],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {

  @Output()
  saveProject = new EventEmitter();

  name='';
  description='';
  hours=200;

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
