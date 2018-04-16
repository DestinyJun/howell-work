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
  // 参数字段
  public loginNameValue: string;
  public loginName: {};
  // 本地字段
  public grade: number;
  public modalId: number;
  public upId: number;
  public auditList: Array<any>;
  public upList: Array<any>;
  public modalRef: BsModalRef;
  constructor(
    private routeInfo: ActivatedRoute,
    private loginService: LoginService,
    private modalService: BsModalService,
    private location: LocationStrategy
  ) {
    this.loginNameValue = this.routeInfo.snapshot.params['loginName'];
    this.grade = this.routeInfo.snapshot.params['grade'];
    this.loginName = {loginName: this.loginNameValue};
    if (this.grade > 0 ) {
      // 注册审核列表(普通人）
      this.loginService.getAuditDataInvite(this.loginName).subscribe(
        (val) => {
          this.auditList = val.rows;
        }
      );
    } else {
      // 注册审核列表(管理员）
      this.loginService.getAuditDataMaster(this.loginName).subscribe(
        (val) => {
          this.auditList = val.rows;
        }
      );
    }

    // 升级审核列表
    this.loginService.getUpAudit(this.loginName).subscribe(
      (val) => {
        this.upList = val.rows;
      }
    );
  }
  ngOnInit() {}

  //  获取注册审核ID
  public auditClick(id): void {
    this.modalId = id;
  }

  // 注册审核确认
  public onAudistClick(): void {
    if (this.grade > 0 ) {
      // 注册普通审核确认
      this.loginService.goAuditInvite({id: this.modalId}).subscribe(
        value => {
          if (value.success) {
            window.location.reload();
            window.alert(value.msg);
          }
        }
      );
    } else {
      // 注册管理员审核
      console.log(this.modalId);
      this.loginService.goAuditMaster({id: this.modalId}).subscribe(
        value => {
          if (value.success) {
            window.location.reload();
            window.alert(value.msg);
          }
        }
      );
    }

  }

  // 获取升级审核ID
  public upClick(id): void {
    this.upId = id;
    console.log(this.upId);
  }

  // 升级审核确认
  public onUpGradeClick(): void {
    console.log(this.upId);
    this.loginService.goUpAudit({id: this.upId}).subscribe(
      value => {
        if (value.success) {
          window.location.reload();
          window.alert(value.msg);
        }
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

}

