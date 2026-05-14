import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EMPLOYEES, ALL_SKILLS } from '../../shared/mockData/mock-data';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './resources.html',
  styleUrls: ['./resources.css']
})
export class Resources {

  employees = [...EMPLOYEES];

  allSkills = ALL_SKILLS;

  search = '';

  showModal = false;

  editingEmployee: any = null;

  form: any = {
    id: '',
    name: '',
    email: '',
    role: 'developer',
    skills: [],
    availability: 100,
    utilization: 0
  };

  get filteredEmployees() {

    return this.employees.filter(emp =>

      emp.name.toLowerCase().includes(this.search.toLowerCase())

      ||

      emp.skills.some((s: string) =>
        s.toLowerCase().includes(this.search.toLowerCase())
      )

    );

  }

  getInitials(name: string) {

    return name
      .split(' ')
      .map(x => x[0])
      .join('')
      .substring(0, 2);

  }

  openAddModal() {

    this.editingEmployee = null;

    this.form = {
      id: '',
      name: '',
      email: '',
      role: 'developer',
      skills: [],
      availability: 100,
      utilization: 0
    };

    this.showModal = true;

  }

  openEditModal(emp: any) {

    this.editingEmployee = emp;

    this.form = {
      ...emp,
      skills: [...emp.skills]
    };

    this.showModal = true;

  }

  closeModal() {

    this.showModal = false;

  }

  toggleSkill(skill: string) {

    const exists = this.form.skills.includes(skill);

    if (exists) {

      this.form.skills =
        this.form.skills.filter((x: string) => x !== skill);

    }
    else {

      this.form.skills.push(skill);

    }

  }

  saveEmployee() {

    if (!this.form.name || !this.form.email) {
      alert('Name and Email required');
      return;
    }

    if (this.editingEmployee) {

      this.employees = this.employees.map(emp =>

        emp.id === this.form.id
          ? { ...this.form }
          : emp

      );

    }
    else {

      this.employees.unshift({
        ...this.form,
        id: 'e' + Date.now()
      });

    }

    this.closeModal();

  }

}