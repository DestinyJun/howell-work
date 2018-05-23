import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {mobileValidators, mobileAsyncValidators, equalValidators } from '../validator/Validators';
import {LoginService} from '../shared/login.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-register-rs',
  templateUrl: './register-rs.component.html',
  styleUrls: ['./register-rs.component.css']
})
export class RegisterRsComponent implements OnInit {
  public inviteCode: string;
  public name: string;
  public errorMessage: string;
  public errorHidden: boolean;
  public formModel: FormGroup;
  constructor(
    private routerInfo: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.inviteCode = this.routerInfo.snapshot.params['invitecode'];
    this.name = this.routerInfo.snapshot.params['name'];
    this.errorHidden = true;
    this.formModel = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [mobileValidators]],
      bank: [''],
      address: [''],
      address1: [''],
      address2: [''],
      card: [''],
      weixin: ['', [Validators.required]],
      inviteCode: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      pconfirm: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}
  public onSubmit(): void {
    if (this.formModel.valid) {
      this.loginService.getRegister(this.formModel.value).subscribe((date) => {
        this.errorMessage = date.msg;
        this.errorHidden = date.success;
        if (date.success) {
          window.alert(date.msg);
          this.router.navigate(['/login']);
        }
      });
    } else {
      alert('用户名不合法或用户名或者密码不能为空');
    }
  }
}
{}
