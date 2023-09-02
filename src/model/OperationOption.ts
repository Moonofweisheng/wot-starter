import KV from './KV'

/*
 * @Author: weisheng
 * @Date: 2021-12-28 15:13:43
 * @LastEditTime: 2023-04-13 22:22:35
 * @LastEditors: weisheng
 * @Description: 模板操作选项
 * @FilePath: \uniapp-vue3-fant-ts\src\model\OperationOption.ts
 * 记得注释
 */
export default class OperationOption {
  label: string = '' // 操作的标题（用于展示）
  name: string | string[] = '' // 操作真实值用于代码传参
  value: KV<any>[] = [] // 操作项数组
}
