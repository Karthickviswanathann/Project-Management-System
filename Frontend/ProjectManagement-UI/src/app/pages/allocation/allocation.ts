import { Component } from '@angular/core';
import { EMPLOYEES, PROJECTS } from '../../shared/mockData/mock-data';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-allocation',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './allocation.html',
  styleUrl: './allocation.css',
})
export class Allocation {

 employees = EMPLOYEES;
  projects = PROJECTS;

  selectedProjectId: string = '';
  selectedMembers: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.selectedProjectId = this.projects[0].id;
  }

  get selectedProject() {
    return this.projects.find(
      x => x.id == this.selectedProjectId
    );
  }

  toggleMember(emp:any){

    let index =
      this.selectedMembers.findIndex(
        x => x.id == emp.id
      );

    if(index>-1){
      this.selectedMembers.splice(index,1);
    }
    else{
      this.selectedMembers.push(emp);
    }
  }

  isSelected(id:string){
    return this.selectedMembers.some(
      x=>x.id==id
    );
  }

  confirmAllocation(){
    alert("Allocation confirmed");
  }

}
