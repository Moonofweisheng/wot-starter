import { InjectionKey, Ref } from 'vue'
import type { Loading, LoadingOptions } from './types'
/**
 * useLoading 用到的key
 *
 * @internal
 */
export declare const loadingDefaultKey: InjectionKey<Ref<boolean>>
export declare const loadingDefaultOptionKey: InjectionKey<Ref<LoadingOptions>>
/**
 * 默认参数
 */
export declare const defaultLoadingOptions: LoadingOptions
export declare function useLoading(selector?: string): Loading
