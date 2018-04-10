import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../shared/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService, LoginNamePersonJson} from '../shared/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // 用户登陆信息字段
  public id: number;
  public loginName: string;
  public name: string;
  public weixin: string;
  public phone: string;
  // 用户基本信息字段
  public grade: number;
  public inviteCode: string;
  public inviteStatus: number;
  public masterStatus: number;
  public gradeTxt: string;
  // 人员管理判断
  public personState = true;
  public personList: Array<any>;
  // 被操会员的id
  public personNameId: number;
  public personPwd: {};
  // 修改信息表单
  public formModel: FormGroup;
  public formModelUp: FormGroup;
  // 模态框
  public modalRef: BsModalRef;
  // 直接好友、上级人数
  public friendPersonList: Array<{}>;
  public friendUpList: Array<{}>;
  // 获取所有会员参数
  public loginNamePersonJson: LoginNamePersonJson;
  constructor(
    private router: Router,
    private routeInfo: ActivatedRoute,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private localSessionStorage: LocalStorageService,
  ) {
    // console.log(this.loginService.goStore());
    // this.loginName = this.routeInfo.snapshot.params['loginName'];
    // this.id = this.routeInfo.snapshot.params['id'];
    this.loginName = this.localSessionStorage.get('loginName');
    this.id = parseInt(this.localSessionStorage.get('id'), 10);
    this.name = this.localSessionStorage.get('name');
    this.weixin = this.localSessionStorage.get('weixin');
    // this.loginNameJson = {loginName: this.loginName};
    this.loginNamePersonJson = new LoginNamePersonJson(this.loginName, 1, 5);
    // 修改信息表单
    this.formModel = fb.group({
      name: [this.name, [Validators.required, Validators.minLength(3)]],
      weixin: [this.weixin, [Validators.required]]
    });
    // 修改密码表单
    this.formModelUp = fb.group({
      pwd: ['', [Validators.required]]
    });
    // 会员信息
    this.loginService.getPerson({loginName: this.loginName}).subscribe((data) => {
      this.grade = data[0].grade;
      this.inviteCode = data[0].inviteCode;
      this.inviteStatus = data[0].inviteStatus;
      this.masterStatus = data[0].masterStatus;
      // this.localSessionStorage.set('grade', this.grade.toString());
      if (this.inviteStatus === 1 && this.masterStatus === 1) {
        if ( this.grade === 0 ) {
          this.gradeTxt = '管理员';
          this.personState = false;
        } else {
          this.gradeTxt =  this.grade.toString();
        }
      } else {
        this.gradeTxt = '未审核';
      }
    });

    // 获取所有会员列表
     this.loginService.getPersonList(this.loginNamePersonJson).subscribe(
       (val) => {
         console.log(val);
         this.personList = val.rows;
       }
     );
    // 直接朋友个数
    this.loginService.numberDirect({loginName: this.loginName}).subscribe(
      (value) => {
        this.friendPersonList = value.rows;
      }
    );
    // 上级朋友个数
    this.loginService.superiorPerson({loginName: this.loginName}).subscribe(
      (value) => {
        this.friendUpList = value.rows;
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
    this.loginService.modifiedData(paramsGroup).subscribe((date) => {
      alert(date.msg);
    });
  }
  public clickUpGrade(): void {
    this.loginService.GradeUp({loginName: this.loginName}).subscribe(
      (value) => {
        if (value.success) {
          window.alert(value.msg);
        }
      }
    );
  }
  //  获取修改ID
  public personDelId(personId): void {
    this.personNameId = personId;
  }
  // 修改确认
  public personDel(): void {
    if (this.formModelUp.valid) {
      this.formModelUp.value['id'] = this.personNameId;
      console.log(this.formModelUp.value);
      this.loginService.passwordUp(this.formModelUp.value).subscribe(
        value => {
          if (value.success) {
            window.location.reload();
            window.alert(value.msg);
          } else {
            window.alert(value.msg);
          }
        }
      );
    }
  }
}
