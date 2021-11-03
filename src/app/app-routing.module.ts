import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EditFormComponent } from './component/edit-form/edit-form.component';
import { FormDataComponent } from './component/form-data/form-data.component';
import { NoPageFoundComponent } from './component/no-page-found/no-page-found.component';
import { HomeComponent } from './component/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { NotloggedGuard } from './guard/notlogged.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent, canActivate: [NotloggedGuard] },

  { path: 'register', component: RegisterComponent },
  { path: 'edit/:id', component: EditFormComponent,canActivate: [AuthGuard] },
  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
