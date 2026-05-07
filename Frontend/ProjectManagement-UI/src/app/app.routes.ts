import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Projects } from './pages/projects/projects';
import { Allocation } from './pages/allocation/allocation';
import { Resources } from './pages/resources/resources';
import { Tasks } from './pages/tasks/tasks';
import { Teams } from './pages/teams/teams';

import { MainLayout } from './layouts/main-layout/main-layout';
import { Notfound } from './pages/notfound/notfound';
export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: '',
    component: MainLayout,

    children: [

      {
        path: 'dashboard',
        component: Dashboard
      },

      {
        path: 'projects',
        component: Projects
      },

      {
        path: 'allocation',
        component: Allocation
      },

      {
        path: 'resources',
        component: Resources
      },

      {
        path: 'tasks',
        component: Tasks
      },

      {
        path: 'teams',
        component: Teams
      }

    ]
  },

  {
    path: '**',
    component: Notfound
  }

];