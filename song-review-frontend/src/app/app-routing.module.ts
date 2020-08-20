import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { AdminGuard } from './_services/admin.guard';
import { SongComponent } from './song/song.component';
import { SearchSongComponent } from './search-song/search-song.component';
import { CreateSongComponent } from './create-song/create-song.component';


const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  { 
    path: '',   
    redirectTo: '/home', 
    pathMatch: 'full' 
  },
  {
    path:'login',
    component: LoginComponent,
    // canActivate: [AuthGuard]
  },
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'song',
    component: SongComponent
  },
  {
    path: 'search',
    component: SearchSongComponent
  },
  {
    path: 'create-song',
    component: CreateSongComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
