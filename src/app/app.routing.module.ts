import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AuditListComponent} from './home/audit-list/audit-list.component';
import {FriendInfoComponent} from './home/friend-info/friend-info.component';
import {QrcodeComponent} from './home/qrcode/qrcode.component';
import {LoginGuard} from './guard/login.guard';
import {RegisterRsComponent} from './register-rs/register-rs.component';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registerrs', component: RegisterRsComponent},
  {path: 'register/:invitecode/:name', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
  {path: 'audit/:loginName/:grade', component: AuditListComponent},
  {path: 'friend/:title/:loginName', component: FriendInfoComponent},
  {path: 'qrcode/:name/:invitecode', component: QrcodeComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
