import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routing.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QRCodeModule} from 'angularx-qrcode';
import {ModalModule} from 'ngx-bootstrap';
import {LoginService} from './shared/login.service';
import {LocalStorageService} from './shared/local-storage.service';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {AuditListComponent} from './home/audit-list/audit-list.component';
import {FriendInfoComponent} from './home/friend-info/friend-info.component';
import {QrcodeComponent} from './home/qrcode/qrcode.component';
import {LoginGuard} from './guard/login.guard';
import { RegisterRsComponent } from './register-rs/register-rs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AuditListComponent,
    FriendInfoComponent,
    QrcodeComponent,
    RegisterRsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    QRCodeModule
  ],
  providers: [LoginService, LocalStorageService, LoginGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
