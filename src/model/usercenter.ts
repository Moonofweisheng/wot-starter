/*
 * @Author: weisheng
 * @Date: 2023-11-21 20:37:43
 * @LastEditTime: 2023-11-21 22:03:38
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-starter\src\model\usercenter.ts
 * 记得注释
 */
const userInfo = {
  avatarUrl: 'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-ui/components-exp/avatar/avatar-1.jpg',
  nickName: '哈瓦纳 🌟',
  phoneNumber: '13438358888',
  gender: 2
}
const countsData = [
  {
    num: 2,
    name: '积分',
    type: 'point'
  },
  {
    num: 10,
    name: '优惠券',
    type: 'coupon'
  }
]

const orderTagInfos = [
  {
    orderNum: 1,
    tabType: 5
  },
  {
    orderNum: 1,
    tabType: 10
  },
  {
    orderNum: 1,
    tabType: 40
  },
  {
    orderNum: 0,
    tabType: 0
  }
]

const customerServiceInfo = {
  servicePhone: '4006336868',
  serviceTimeDuration: '每周三至周五 9:00-12:00  13:00-15:00'
}

export const genSimpleUserInfo = () => ({ ...userInfo })

export const genUsercenter = () => ({
  userInfo,
  countsData,
  orderTagInfos,
  customerServiceInfo
})
