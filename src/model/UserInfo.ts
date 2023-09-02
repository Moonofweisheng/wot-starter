/*
 * @Author: weisheng
 * @Date: 2023-04-17 11:58:46
 * @LastEditTime: 2023-04-18 18:11:53
 * @LastEditors: weisheng
 * @Description: 登录信息
 * @FilePath: \uniapp-vue3-fant-ts\src\model\UserInfo.ts
 * 记得注释
 */
export default class UserInfo {
  // 联系方式
  linkMan: Nullable<string> = null
  // 帐号
  loginId: Nullable<string> = null
  // 手机号
  mobile: Nullable<string> = null
  // 名称
  nickName: Nullable<string> = null
  // 求学之所
  school: Nullable<string> = null
  // token
  token: Nullable<string> = null
  // uuid
  uuid: Nullable<string> = null
}
