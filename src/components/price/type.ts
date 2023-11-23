export const priceProps = {
  priceUnit: {
    type: String,
    default: 'fen'
  }, // 价格单位，分 | 元, fen，yuan
  price: {
    type: [String, Number],
    default: ''
  }, // 价格, 以分为单位
  type: {
    type: String,
    default: '' //
  }, //  main 粗体, lighter 细体, mini 黑色, del 中划线, delthrough 中划线，包括货币符号
  symbol: {
    type: String,
    default: '¥' // '￥',
  }, // 货币符号，默认是人民币符号￥
  fill: {
    type: Boolean
  }, // 是否自动补齐两位小数
  decimalSmaller: {
    type: Boolean
  }, // 小数字号小一点
  lineThroughWidth: {
    type: String,
    default: '0.12em'
  }, // 划线价线条高度
  customClass: {
    type: String,
    default: ''
  }
}
