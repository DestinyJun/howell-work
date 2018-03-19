import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {mobileValidators, mobileAsyncValidators, equalValidators } from '../validator/Validators';
import {LoginService} from '../shared/login.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public errorMessage: string;
  public errorHidden: boolean;
  formModel: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.errorHidden = true;
    this.formModel = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [mobileValidators]],
      weixin: ['', [Validators.required]],
      inviteCode: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      pconfirm: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}
  public onSubmit(): void {
    console.log(this.formModel.value);
    this.loginService.getRegister(this.formModel.value).subscribe((date) => {
      console.log(date);
      this.errorMessage = date.msg;
      this.errorHidden = date.success;
      if (date.success) {
        window.alert(date.msg);
        this.router.navigate(['/login']);
      }
    });
  }
}
{}
