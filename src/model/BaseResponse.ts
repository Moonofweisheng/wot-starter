/*
 * @Author: weisheng
 * @Date: 2023-04-17 11:55:21
 * @LastEditTime: 2023-04-17 11:56:43
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \uniapp-vue3-fant-ts\src\model\BaseResponse.ts
 * 记得注释
 */
export default class BaseResponse<T> {
  code: Nullable<number> = null
  msg: Nullable<string> = null
  data: Nullable<T> = null
}
