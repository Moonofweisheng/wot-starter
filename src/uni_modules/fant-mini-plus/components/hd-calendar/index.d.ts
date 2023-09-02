import { InjectionKey, Ref } from 'vue'
import type { Calendar } from './types'
/**
 * useCalendar 用到的key
 *
 * @internal
 */
export declare const calendarDefaultKey: InjectionKey<Ref<boolean>>
export declare function useCalendar(selector?: string): Calendar
