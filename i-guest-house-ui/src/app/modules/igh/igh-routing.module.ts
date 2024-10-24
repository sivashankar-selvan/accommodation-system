import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './pages/employee/employee.component';
import { authGuard } from 'src/app/services/guard/auth.guard';
import { ManagerComponent } from './pages/manager/manager.component';
import { HrComponent } from './pages/hr/hr.component';
import { EmployeeBookingsComponent } from './components/employee-bookings/employee-bookings.component';
import { HrRequestFormComponent } from './components/hr-request-form/hr-request-form.component';
import { RequestsTableComponent } from './components/requests-table/requests-table.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [authGuard],
    children:[

    ]
  },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [authGuard],
    children:[
      {
        path:"",
        component:MainComponent,
        canActivate:[authGuard]
      }
    ]
  },
 
  
  {
    path: 'hr',
    component: HrComponent,
    canActivate: [authGuard],
    children:[
      {
        path: '',
        component: HrRequestFormComponent,
        canActivate: [authGuard]
      },
      {
        path: 'requestsTable',
        component: RequestsTableComponent,
        canActivate: [authGuard]
      },
      {
        path: 'yourBookings',
        component: EmployeeBookingsComponent,
        canActivate: [authGuard]
      },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IghRoutingModule { }
