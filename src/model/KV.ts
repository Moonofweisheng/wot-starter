/*
 * @Author: weisheng
 * @Date: 2021-12-28 15:57:08
 * @LastEditTime: 2023-11-12 12:08:41
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\model\KV.ts
 * 记得注释
 */
export default interface KV<T> {
  label: string // 操作标题
  value: T // 操作项数组
}
