import { InjectionKey, Ref } from 'vue'
import { Popup } from './types'
/**
 * usePopup 用到的key
 *
 * @internal
 */
export declare const popupDefaultKey: InjectionKey<Ref<boolean>>
export declare function usePopup(selector?: string): Popup
