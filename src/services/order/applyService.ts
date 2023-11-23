import { config } from '../../config/index'
import { delay } from '../_utils/delay'
import { genRightsPreview, genApplyReasonList, applyService } from '../../model/order/applyService'

/** 获取售后单mock数据 */
function mockFetchRightsPreview(params: any): Promise<any> {
  return delay().then(() => genRightsPreview(params))
}

/** 获取售后单数据 */
export function fetchRightsPreview(params: any): Promise<any> {
  if (config.useMock) {
    return mockFetchRightsPreview(params)
  }

  return new Promise((resolve) => {
    resolve('real api')
  })
}

/** 确认收货 */
export function dispatchConfirmReceived(): Promise<any> {
  if (config.useMock) {
    return delay()
  }

  return new Promise((resolve) => {
    resolve('real api')
  })
}

/** 获取可选的mock售后原因列表 */
function mockFetchApplyReasonList(params: any): Promise<any> {
  return delay().then(() => genApplyReasonList(params))
}

/** 获取可选的售后原因列表 */
export function fetchApplyReasonList(params: any): Promise<any> {
  if (config.useMock) {
    return mockFetchApplyReasonList(params)
  }

  return new Promise((resolve) => {
    resolve('real api')
  })
}

/** 发起mock售后申请 */
function mockDispatchApplyService(params: any): Promise<any> {
  return delay().then(() => applyService(params))
}

/** 发起售后申请 */
export function dispatchApplyService(params: any): Promise<any> {
  if (config.useMock) {
    return mockDispatchApplyService(params)
  }

  return new Promise((resolve) => {
    resolve('real api')
  })
}
