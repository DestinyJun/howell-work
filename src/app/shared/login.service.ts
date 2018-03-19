import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {
  // 用户信息字段 路由读取
  public id: number;
  public loginName: string;
  constructor(private http: HttpClient) { }
  public getLogin(params): Observable<any> {
    return this.http.get('/api/loginWeb', {params});
  }
  public getRegister(params): Observable<any> {
    return this.http.get('/api/user/addUser', {params});
  }
  public getPerson(params): Observable<any> {
    return this.http.get('/api/user/selectPersonal', {params});
  }
  public modifiedData(params): Observable<any> {
    return this.http.get('/api/user/updatePersonal', {params});
  }
  // 获取注册审核列表
  public getAuditData(params): Observable<any> {
    console.log(params);
    return this.http.get('/api/user/auditList', {params});
  }
  // 注册审核接口
  public goAudit(params): Observable<any> {
    console.log(params);
    return this.http.get('/api/user/doAuditList', {params});
  }

  // 获取升级审核接口
  public getUpAudit(params): Observable<any> {
    console.log(params);
    return this.http.get('/api/user/upGradeListTest', {params});
  }

  // 获取升级审核接口
  public goUpAudit(params): Observable<any> {
    console.log(params);
    return this.http.get('/api/user/doUpGradeList', {params});
  }
}
