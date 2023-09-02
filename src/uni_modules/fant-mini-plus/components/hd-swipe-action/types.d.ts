import { Ref } from 'vue'
export interface SwipeAction {
  moveIndex: Ref<number>
  updateIndex(index: number): void
}
