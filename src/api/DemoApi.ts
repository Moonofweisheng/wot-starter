/*
 * @Author: weisheng
 * @Date: 2023-04-17 12:51:22
 * @LastEditTime: 2023-04-20 15:01:53
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \uniapp-vue3-fant-ts\src\api\DemoApi.ts
 * 记得注释
 */
import http from '@/http/HttpClient'
import BaseResponse from '@/model/BaseResponse'
import Chanel from '@/model/Chanel'
import UserInfo from '@/model/UserInfo'
// 这里将API方法统一管理
export default class DemoApi {
  /**
   * 登录
   */
  static login(): Promise<BaseResponse<UserInfo>> {
    return http
      .server()
      .post('api/login', {}, {})
      .then((res) => {
        return res.data
      })
  }

  /**
   * 初始化
   */
  static init(abortRequest: 'same' | 'all' | 'none' = 'none'): Promise<BaseResponse<Chanel[]>> {
    return http
      .server(abortRequest)
      .post('api/init', {}, {})
      .then((res) => {
        return res.data
      })
  }
}
