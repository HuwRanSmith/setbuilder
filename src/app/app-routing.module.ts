import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowseComponent } from './components/browse/browse.component';
import { EditComponent } from './components/edit/edit.component';
import { LoginComponent } from './components/login/login.component';
import { MyListsComponent } from './components/my-lists/my-lists.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'lists', component: MyListsComponent, canActivate: [AuthGuard] },
  { path: 'browse', component: BrowseComponent, canActivate: [AuthGuard] },
  {
    path: 'lists/edit/new',
    component: EditComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
