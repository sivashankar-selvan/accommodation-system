import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './services/guard/auth.guard';
import { EmployeeComponent } from './modules/igh/pages/employee/employee.component';
import { HrComponent } from './modules/igh/pages/hr/hr.component';
import { ManagerComponent } from './modules/igh/pages/manager/manager.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'igh', loadChildren: () => import('./modules/igh/igh.module').then(m=>m.IghModule), canActivate: [authGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [authGuard] },