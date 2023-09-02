import { InjectionKey, Ref } from 'vue'
import type { Modal, ModalOptions } from './types'
/**
 * 默认参数
 */
export declare const defaultModalOptions: ModalOptions
/**
 * useModal 用到的key
 *
 * @internal
 */
export declare const modalDefaultKey: InjectionKey<Ref<boolean>>
export declare const modalDefaultOptionKey: InjectionKey<Ref<ModalOptions>>
export declare function useModal(selector?: string): Modal
