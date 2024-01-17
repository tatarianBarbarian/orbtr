import { getWeek } from '@/services/api'
import type { WeekActvities } from '@/types'
import type { Dayjs } from 'dayjs'
import { reactive } from 'vue'

export const fetcherDateFormat = 'YYYY-MM-DD'

export function useWeekFetcher() {
  const state = reactive<{
    status: 'loading' | 'error' | 'done'
    data: WeekActvities
    error: Error | null
  }>({
    status: 'loading',
    data: [],
    error: null
  })

  const fetchWeek = (startDate: Dayjs) => {
    state.status = 'loading'

    return getWeek(startDate.format(fetcherDateFormat))
      .then((data) => {
        state.status = 'done'
        state.data = data.map((el) => ({
          ...el,
          array: el.array.map((day) => ({ ...day, id: day.id + Math.random() }))
        })) // Add more random factor to IDs for safe keys
      })
      .catch((error) => {
        state.status = 'error'
        state.error = error
      })
  }

  return reactive({
    state,
    fetchWeek
  })
}
