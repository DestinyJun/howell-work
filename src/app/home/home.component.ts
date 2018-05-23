import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginNamePersonJson, LoginService} from '../shared/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../shared/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // 用户登陆信息字段
  public id: number;
  public loginName: string;
  // 用户基本信息字段
  public name: string;
  public weixin: string;
  public phone: string;
  public grade: number;
  public inviteCode: string;
  public inviteStatus: number;
  public masterStatus: number;
  public gradeTxt: string;
  public address: string;
  public address1: string;
  public address2: string;
  public bank: string;
  public card: number;
  public upGradeStatus: number;
  // 人员管理判断
  public personState = true;
  public personList: Array<any>;
  // 被操会员的id
  public personNameId: number;
  public num: number;
  // 修改信息表单
  public formModel: FormGroup;
  public formModelUp: FormGroup;
  public ckeckForm: any;
  // 模态框
  public modalRef: BsModalRef;
  // 直接好友、上级人数
  public friendPersonList: Array<{}>;
  public friendUpList: Array<{}>;
  // 获取所有会员参数 分页
  public loginNamePersonJson: LoginNamePersonJson;
  constructor(
    private router: Router,
    private routeInfo: ActivatedRoute,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private localSessionStorage: LocalStorageService,
  ) {
    this.loginName = this.localSessionStorage.get('loginName');
    this.id = parseInt(this.localSessionStorage.get('id'), 10);
    this.loginNamePersonJson = new LoginNamePersonJson(this.loginName, 1, 5);
    // 修改密码表单
    this.formModelUp = fb.group({
      pwd: ['', [Validators.required]]
    });
    // 会员信息
    this.loginService.getPerson({loginName: this.loginName}).subscribe((data) => {
      console.log(data);
      this.ckeckForm = data[0];
      this.name = data[0].name;
      this.address = data[0].address;
      this.address1 = data[0].address1;
      this.address2 = data[0].address2;
      this.bank = data[0].bank;
      this.card = data[0].card;
      this.weixin = data[0].weixin;
      this.grade = data[0].grade;
      this.inviteCode = data[0].inviteCode;
      this.inviteStatus = data[0].inviteStatus;
      this.masterStatus = data[0].masterStatus;
      this.upGradeStatus = data[0].upgradeStatus;
      if (this.inviteStatus === 1 && this.masterStatus === 1) {
        if ( this.grade === 0 ) {
          this.gradeTxt = '10';
          this.personState = false;
        } else {
          this.gradeTxt =  this.grade.toString();
        }
      } else {
        this.gradeTxt = '未审核';
      }
      // 修改信息表单
      this.formModel = fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        weixin: ['', [Validators.required]],
        address: [''],
        address1: [''],
        address2: [''],
        bank: [''],
        card: ['']
      });
      this.formModel.reset(this.ckeckForm);
    });

    // 获取所有会员列表
     this.loginService.getPersonList(this.loginNamePersonJson).subscribe(
       (val) => {
         this.num = val.total;
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
  // 修改个人资料
  public upPersonMsg(): void {
    this.formModel.value.id = this.id;
    if (this.formModel.valid) {
      this.loginService.modifiedData(this.formModel.value).subscribe((date) => {
        alert(date.msg);
        window.location.reload();
      });
    }
  }
  // 提交升级
  public clickUpGrade(): void {
    this.loginService.GradeUp({loginName: this.loginName}).subscribe(
      (value) => {
        if (value.success) {
          window.location.reload();
          window.alert(value.msg);
        }
      }
    );
  }
  //  获取修改密码ID
  public personDelId(personId): void {
    this.personNameId = personId;

  }
  // 修改密码确认
  public personDel(): void {
    if (this.formModelUp.valid) {
      this.formModelUp.value['id'] = this.personNameId;
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
  // 上一页
  public previousPage(): void {
    if (this.loginNamePersonJson.page <= 1) {
      this.loginNamePersonJson.page = 1;
      window.alert('已经数第一页了');
    } else {
      this.loginNamePersonJson.page = this.loginNamePersonJson.page - 1;
      this.loginService.getPersonList(this.loginNamePersonJson).subscribe(
        (value) => {
          this.personList = value.rows;
        }
      );
    }
  }
  // 下一页
  public nextPage(): void {
    if (this.loginNamePersonJson.page >= Math.ceil(this.num / 5)) {
      this.loginNamePersonJson.page = Math.ceil(this.num / 5);
      window.alert('这是最后一页');
    } else {
      this.loginNamePersonJson.page = this.loginNamePersonJson.page + 1;
      this.loginService.getPersonList(this.loginNamePersonJson).subscribe(
        (value) => {
          this.personList = value.rows;
        }
      );
    }
  }
}
