import { InjectionKey, Ref } from 'vue'
import type { Toast, ToastOptions } from './types'
/**
 * useToast 用到的key
 *
 * @internal
 */
export declare const toastDefaultKey: InjectionKey<Ref<boolean>>
export declare const toastDefaultOptionKey: InjectionKey<Ref<ToastOptions>>
/**
 * 默认参数
 */
export declare const defaultToastOptions: ToastOptions
export declare function useToast(selector?: string): Toast
