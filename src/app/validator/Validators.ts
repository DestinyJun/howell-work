import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

// 自定义校验器之校验手机号码是否合法
export function mobileValidators (control: FormControl): any {
  var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  let valid = myreg.test(control.value);
  return valid ? null : {mobile: true};
}

// 异步校验器
export function mobileAsyncValidators (control: FormControl): any {
  // 定义正则表达式 起到筛选字段的作用
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  let valid = myreg.test(control.value);
  return Observable.of (valid ? null : {mobile: true}).delay(5000);
}

// 自定义校验器之校验两次密码是否一致
export function equalValidators (group: FormGroup): any {
  let password: FormControl = group.get('password') as FormControl;
  let pconfirm: FormControl = group.get('pconfirm') as FormControl;
  let valid: boolean = (password.value === pconfirm.value);
  return valid ? null : {equal : {errmsg: '两次输入的密码不一致'}};
}

/**表单校验的八个状态
 * valid：是否校验成功
 invalid：是否校验失败
 pending：是否表单正在提交过程中
 pristine：是否数据依然处于原始状态，用户没有修改过
 dirty：是否数据已经变脏了，被用户改过了
 touched：是否被触摸或者点击过
 untouched：是否未被触摸或者点击
 enabled：是否启用状态
 disabled：是否禁用状态
 * */

