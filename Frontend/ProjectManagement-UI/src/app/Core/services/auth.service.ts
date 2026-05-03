import { Injectable } from '@angular/core';
import { DEMO_USERS } from '../../shared/mockData/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private STORAGE_KEY =
    'rms_demo_user';


  user: any = null;

  isAuthenticated = false;


  ROLE_LABELS: any = {

    admin:
      'Admin / Delivery Manager',

    tl:
      'Team Lead / Coordinator',

    developer:
      'Developer',

    tester:
      'Tester / QA'

  };


  constructor() {

    this.loadUser();

  }



  private loadUser(): void {

    try {

      const raw =
        localStorage.getItem(
          this.STORAGE_KEY
        );


      if(raw){

        this.user =
          JSON.parse(raw);

        this.isAuthenticated =
          true;

      }

    }
    catch{

    }

  }



  login(role:string): void {

    const selectedUser =
      DEMO_USERS[role];

    this.persist(
      selectedUser
    );

  }



  switchRole(role:string): void {

    const selectedUser =
      DEMO_USERS[role];

    this.persist(
      selectedUser
    );

  }



  logout(): void {

    this.persist(
      null
    );

  }



  private persist(
    user:any
  ): void {

    this.user = user;

    this.isAuthenticated =
      !!user;


    if(user){

      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(user)
      );

    }
    else{

      localStorage.removeItem(
        this.STORAGE_KEY
      );

    }

  }

}