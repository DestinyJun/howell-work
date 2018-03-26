import {Component, OnInit, TemplateRef, } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {LocationStrategy} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from '../../shared/login.service';

@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styleUrls: ['./audit-list.component.css']
})
export class AuditListComponent implements OnInit {
  //参数字段
  public loginNameValue: string;
  public loginName: {};
  // 本地字段
  public modalId: {};
  public upId: {};
  public auditList: Array<any>;
  public upList: Array<any>;
  modalRef: BsModalRef;
  constructor(
    private routeInfo: ActivatedRoute,
    private loginService: LoginService,
    private modalService: BsModalService,
    private location: LocationStrategy
  ) {}
  ngOnInit() {
    this.loginNameValue = this.routeInfo.snapshot.params['loginName'];
    this.loginName = {loginName: this.loginNameValue};

    // 注册审核列表
    this.loginService.getAuditData(this.loginName).subscribe(
      (val) => {
       this.auditList = val.rows;
      }
    );

    // 升级审核列表
    this.loginService.getUpAudit(this.loginName).subscribe(
      (val) => {
        this.upList = val.rows;
      }
    );
  }
  // 打开弹窗
  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  // 返回上级路由
  public goBack(): void {
    this.location.back();
  }
  //  注册审核
  public auditClick(tdid): void {
    this.modalId = {id: parseInt(tdid.innerText)};
    console.log(this.modalId);
  }

  // 升级审核
  public upClick(uptdid): void {
    this.upId = {id: parseInt(uptdid.innerText)};
    console.log(this.upId);
  }

  // 注册审核确认
  public onAudistClick(): void {
    this.loginService.goAudit(this.modalId).subscribe(
      value => {
        if (value.success) {
          window.location.reload();
          window.alert(value.msg);
        }
      }
    );
  }

  // 升级审核确认
  public onUpGradeClick(): void {
    this.loginService.goUpAudit(this.upId).subscribe(
      value => {
        if (value.success) {
          window.location.reload();
          window.alert(value.msg);
        }
      }
    );
  }
}

