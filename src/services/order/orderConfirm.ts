import { config } from '../../config/index'
import { mockIp, mockReqId } from '../../utils/mock'
import { delay } from '../_utils/delay'
import { genSettleDetail } from '../../model/order/orderConfirm'

/** 获取结算mock数据 */
function mockFetchSettleDetail(params: any): Promise<any> {
  return delay().then(() => genSettleDetail(params))
}

/** 提交mock订单 */
function mockDispatchCommitPay(params: any): Promise<any> {
  return delay().then(() => ({
    data: {
      isSuccess: true,
      tradeNo: '350930961469409099',
      payInfo: '{}',
      code: null,
      transactionId: 'E-200915180100299000',
      msg: null,
      interactId: '15145',
      channel: 'wechat',
      limitGoodsList: null
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 891,
    success: true
  }))
}

/** 获取结算数据 */
export function fetchSettleDetail(params: any): Promise<any> {
  if (config.useMock) {
    return mockFetchSettleDetail(params)
  }

  return new Promise((resolve) => {
    resolve('real api')
  })
}

/* 提交订单 */
export function dispatchCommitPay(params: any): Promise<any> {
  if (config.useMock) {
    return mockDispatchCommitPay(params)
  }

  return new Promise((resolve) => {
    resolve('real api')
  })
}

/** 开发票 */
export function dispatchSupplementInvoice(): Promise<any> {
  if (config.useMock) {
    return delay()
  }

  return new Promise((resolve) => {
    resolve('real api')
  })
}
