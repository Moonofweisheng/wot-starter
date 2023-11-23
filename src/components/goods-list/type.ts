export const goodsListProps = {
  goods: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  id: {
    type: String
  },
  thresholds: {
    type: Array as PropType<number[]>,
    default: () => []
  }
}
