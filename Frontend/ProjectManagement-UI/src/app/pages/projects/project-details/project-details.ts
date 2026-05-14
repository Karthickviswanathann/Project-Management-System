import { CommonModule } from '@angular/common';
import { Component, Input ,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-details.html',
  styleUrls: ['./project-details.css'],
})
export class ProjectDetails {

  @Input()
  project:any;

  @Output()
  close = new EventEmitter<void>();

  suggested:any[]=[];

  autoAllocate(){

    alert("Auto allocate");

  }

  confirmAllocation(){

    alert("Allocation confirmed");

  }
   closeDetails(){

    this.close.emit();

  }


}
