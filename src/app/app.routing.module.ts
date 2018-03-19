import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AuditListComponent} from './home/audit-list/audit-list.component';
import {FriendInfoComponent} from './home/friend-info/friend-info.component';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home/:loginName/:id', component: HomeComponent},
  {path: 'audit/:loginName', component: AuditListComponent},
  {path: 'friend/:title', component: FriendInfoComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
