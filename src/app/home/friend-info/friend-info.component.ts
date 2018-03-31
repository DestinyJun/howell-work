import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {LoginService} from '../../shared/login.service';

@Component({
  selector: 'app-friend-info',
  templateUrl: './friend-info.component.html',
  styleUrls: ['./friend-info.component.css']
})
export class FriendInfoComponent implements OnInit {
  public title: string;
  public loginName: string;
  public personList: Array<{}>;
  public loginNameJson: {};
  constructor(
    private loginService: LoginService,
    private routeInfo: ActivatedRoute,
    private location: LocationStrategy,
  ) {
    this.title = this.routeInfo.snapshot.params['title'];
    this.loginName = this.routeInfo.snapshot.params['loginName'];
    this.loginNameJson = {loginName: this.loginName};
    if (this.title === '直接人数') {
      this.loginService.numberDirect(this.loginNameJson).subscribe(
        (value) => {
          this.personList = value.rows;
        }
      );
    } else if (this.title === '上级好友') {
      this.loginService.superiorPerson(this.loginNameJson).subscribe(
        (value) => {
          this.personList = value.rows;
        }
      );
    }
  }

  ngOnInit() {}
  public goBack(): void {
    this.location.back();
  }
}
