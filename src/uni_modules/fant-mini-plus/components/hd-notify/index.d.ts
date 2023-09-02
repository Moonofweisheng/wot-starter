import { InjectionKey, Ref } from 'vue'
import type { Notify, NotifyOptions } from './types'
/**
 * 默认参数
 */
export declare const defaultNotifyOptions: NotifyOptions
/**
 * useNotify 用到的key
 *
 * @internal
 */
export declare const notifyDefaultKey: InjectionKey<Ref<boolean>>
export declare const notifyDefaultOptionKey: InjectionKey<Ref<NotifyOptions>>
export declare function useNotify(selector?: string): Notify
