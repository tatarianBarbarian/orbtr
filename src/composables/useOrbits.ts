import { onMounted, reactive, ref, watch } from 'vue'
import { type DayActivities } from '../types.ts'
import { useWeekFetcher, fetcherDateFormat } from './useWeekFetcher.ts'
import dayjs, { Dayjs } from 'dayjs'
import isToday from 'dayjs/plugin/isToday'

export function useOrbits() {
  dayjs.extend(isToday)

  const daysCache = reactive<DayActivities[]>([])
  const firstDay = ref<Dayjs | null>(null)
  const { state, fetchWeek } = useWeekFetcher()

  type Orbit = {
    level: number
    activities: DayActivities
  }
  const orbits = reactive<{ list: Orbit[] }>({ list: [] })

  watch(state, (value) => {
    if (value.status === 'done') {
      daysCache.push(...value.data)

      if (firstDay.value === null) {
        firstDay.value = dayjs()
      }
    }
  })

  watch(firstDay, (newFirstDay) => {
    const todayFormatted = dayjs(newFirstDay).format(fetcherDateFormat)
    const offsetStart = daysCache.findIndex((el) => el.contact_date === todayFormatted)
    const offset = daysCache.slice(offsetStart, offsetStart + 7)
    const orbitsToDisplay = offset.map((el, ind) => {
      return { activities: el, level: ind + 1 }
    })

    orbits.list = orbitsToDisplay

    // Check if there is need to load data to avoid blocking
    const yesterdayFormatted = dayjs(newFirstDay).subtract(1, 'day').format(fetcherDateFormat)
    const yesterdayInd = daysCache.findIndex((el) => el.contact_date === yesterdayFormatted)
    const isEnoughDaysInCache = yesterdayInd + 7 <= daysCache.length

    if (!isEnoughDaysInCache) {
      const lastDayInCache = dayjs(daysCache[daysCache.length - 1].contact_date).subtract(1, 'day')
      fetchWeek(lastDayInCache)
    }
  })

  const nextDay = () => {
    if (dayjs(firstDay.value).isToday()) {
      return
    }

    orbits.list.forEach((orbit) => {
      orbit.level += 1
    })
    firstDay.value = dayjs(firstDay.value).add(1, 'day')
  }

  const previousDay = () => {
    if (state.status === 'loading') {
      return
    }

    orbits.list.forEach((orbit) => {
      orbit.level -= 1
    })
    firstDay.value = dayjs(firstDay.value).subtract(1, 'day')
  }

  onMounted(() => {
    fetchWeek(dayjs())
  })

  return reactive({
    previousDay,
    nextDay,
    orbits,
    state
  })
}
