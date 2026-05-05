import { Injectable } from '@angular/core';
import { Role } from '../../shared/mockData/types';

// export type Role =
//   | 'admin'
//   | 'tl'
//   | 'developer'
//   | 'tester';


export interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private STORAGE_KEY = 'rms_demo_user';


  ROLE_LABELS: Record<Role, string> = {
    admin: 'Admin / Delivery Manager',
    tl: 'Team Lead / Coordinator',
    developer: 'Developer',
    tester: 'Tester / QA'
  };


  DEMO_USERS: Record<Role, User> = {

    admin: {
      name: 'Admin User',
      email: 'admin@company.com',
      role: 'admin'
    },

    tl: {
      name: 'Team Lead',
      email: 'tl@company.com',
      role: 'tl'
    },

    developer: {
      name: 'Developer',
      email: 'developer@company.com',
      role: 'developer'
    },

    tester: {
      name: 'Tester',
      email: 'tester@company.com',
      role: 'tester'
    }

  };


  user: User | null = null;


  constructor() {
    this.loadUser();
  }


  private loadUser(): void {

    try {

      const raw = localStorage.getItem(
        this.STORAGE_KEY
      );

      if (raw) {

        this.user = JSON.parse(raw);

      }

    }
    catch {

      this.user = null;

    }

  }


  private persist(
    user: User | null
  ): void {

    this.user = user;


    if (user) {

      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(user)
      );

    }
    else {

      localStorage.removeItem(
        this.STORAGE_KEY
      );

    }

  }


  login(
    role: Role
  ): void {

    this.persist(
      this.DEMO_USERS[role]
    );

  }


  switchRole(
    role: Role
  ): void {

    this.persist(
      this.DEMO_USERS[role]
    );

  }


  logout(): void {

    this.persist(null);

  }


  isAuthenticated(): boolean {

    return this.user !== null;

  }


  getCurrentUser(): User | null {

    return this.user;

  }

}