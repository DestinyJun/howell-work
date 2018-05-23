import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {mobileValidators, mobileAsyncValidators, equalValidators } from '../validator/Validators';
import {LoginService} from '../shared/login.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public inviteCode: string;
  public name: string;
  public errorMessage: string;
  public errorHidden: boolean;
  public formModel: FormGroup;
  public formModelTwo: FormGroup;
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
      adress: [''],
      adress1: [''],
      adress2: [''],
      card: [''],
      weixin: ['', {disabled: true}, [Validators.required]],
      inviteCode: [{value: this.inviteCode, disabled: true}, []],
      password: ['', [Validators.required, Validators.minLength(6)]],
      pconfirm: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.formModelTwo = new FormGroup({
      name: new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(3)])
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
