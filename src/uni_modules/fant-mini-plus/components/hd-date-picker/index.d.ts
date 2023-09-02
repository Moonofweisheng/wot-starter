import { InjectionKey, Ref } from 'vue'
import type { DatePicker, DatePickerOptions } from './types'
/**
 * useDatePicker 用到的key
 *
 * @internal
 */
export declare const datePickerDefaultKey: InjectionKey<Ref<boolean>>
export declare const datePickerDefaultOptionKey: InjectionKey<Ref<DatePickerOptions>>
/**
 * DatePicker默认参数
 * @returns
 */
export declare function getDefaultOptions(): DatePickerOptions
export declare function useDatePicker(selector?: string): DatePicker
