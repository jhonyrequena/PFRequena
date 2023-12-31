import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardGuard } from './core/guards/dashboard.guard';

const routes: Routes = [

  {
    path: 'dashboard', 
    canActivate: [dashboardGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then((ref) => ref.DashboardModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((ref) => ref.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
