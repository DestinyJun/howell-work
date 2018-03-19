import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../shared/login.service';
import {ActivatedRoute} from '@angular/router';

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
  public grade: string;
  // 修改信息字段
  public formModel: FormGroup;
  // 模态框
  public modalRef: BsModalRef;
  // 注册列表
  public auditList: Array<any>;
  // 升级列表
  public auditUpList: Array<any>;
  constructor(
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

    this.loginService.getPerson({loginName: this.loginName}).subscribe((data) => {
      this.name = data[0].name;
      this.weixin = data[0].weixin;
      this.grade = data[0].grade;
    });

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
      console.log(date);
      alert(date.msg);
    });
  }

  public onclick(spanGrade): void {
    console.log(spanGrade.innerText);
  }

}
