import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-details',
  imports: [],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
})
export class ProjectDetails {

  @Input()
  project:any;

  suggested:any[]=[];

  autoAllocate(){

    alert("Auto allocate");

  }

  confirmAllocation(){

    alert("Allocation confirmed");

  }


}
