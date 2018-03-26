import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../shared/login.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // 用户信息字段 路由读取
  public id: number;
  public loginName: string;
  // 后台读取
  public name: string;
  public weixin: string;
  public grade: number;
  public inviteCode: string;
  // 修改信息字段
  public formModel: FormGroup;
  // 模态框
  public modalRef: BsModalRef;
  // 注册列表
  public auditList: Array<any>;
  // 升级列表
  public auditUpList: Array<any>;
  public loginNameJson: {};
  constructor(
    private router: Router,
    private routeInfo: ActivatedRoute,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.formModel = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      weixin: ['', [Validators.required]]
    });
    this.loginName = this.routeInfo.snapshot.params['loginName'];
    this.id = this.routeInfo.snapshot.params['id'];
    this.loginNameJson = {loginName: this.loginName};
    // 会员信息
    this.loginService.getPerson({loginName: this.loginName}).subscribe((data) => {
      this.name = data[0].name;
      this.weixin = data[0].weixin;
      this.grade = data[0].grade;
      this.inviteCode = data[0].inviteCode;
    });
    // 获取注册审核列表
    this.loginService.getAuditData(this.loginNameJson).subscribe(
      (val) => {
        this.auditList = val.rows;
      }
    );
    // 升级审核列表
    this.loginService.getUpAudit(this.loginNameJson).subscribe(
      (val) => {
        this.auditUpList = val.rows;
      }
    );
  }

  ngOnInit() {}
  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  public openPerson(person: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(person);
  }
  public onSubmit(): void {
    const paramsGroup = this.formModel.value;
    paramsGroup.id = this.id;
    if (paramsGroup.weixin === '') {
      paramsGroup.weixin = this .weixin;
    }
    this.loginService.modifiedData(paramsGroup).subscribe((date) => {
      alert(date.msg);
    });
  }
  public clickUpGrade(): void {
    this.loginService.GradeUp(this.loginNameJson).subscribe(
      (value) => {
        if (value.success) {
          window.alert(value.msg);
        }
      }
    );
  }
}
