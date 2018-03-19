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
  public loginNameValue: string;
  public loginName: {};
  // 本地字段
  public modalId: {};
  public auditList: Array<any>;
  public auditUpList: Array<any>;
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
    console.log( this.loginName);
    this.loginService.getAuditData(this.loginName).subscribe(
      (val) => {
       this.auditList = val.rows;
        console.log(this.auditList);
      }
    );
    this.loginService.getUpAudit(this.loginName).subscribe(
      (val) => {
        // this.auditUpList = val.rows;
        console.log(val);
      }
    );
  }
  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  public goBack(): void {
    this.location.back();
  }
  public onClick(tdid): void {
    this.modalId = {id: parseInt(tdid.innerText)};
    console.log(this.modalId);
  }
  public onModalClick(): void {
    this.loginService.goAudit(this.modalId).subscribe(
      value => {
        console.log(value);
        if (value.success) {

        }
      }
    );
  }
}

