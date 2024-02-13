import { HttpHandler, HttpResponse, http } from 'msw'
import { baseUrl } from '../services/api'
import dayjs from 'dayjs'
import type { Activity, WeekActvities } from '@/types'
import { faker } from '@faker-js/faker'

const makeRandomActivity = (): Activity => {
  const id = Math.floor(Math.random() * 100000 + Math.random() * 100500)
  const img = faker.image.avatar()

  return {
    id,
    created_at: dayjs().unix(),
    name: faker.person.fullName(),
    img,
    position: faker.person.jobTitle(),
    city: `${faker.location.city()}, ${faker.location.country()}`,
    _orbits_last_message: {
      message: faker.lorem.lines(3),
      message_head: faker.lorem.lines(1)
    }
  }
}

export const handler: HttpHandler = http.get(`${baseUrl}/receive_week`, ({ request }) => {
  const url = new URL(request.url)
  const startDate = url.searchParams.get('start_date')

  const firstDay = dayjs(startDate)
  const daysCountToShow = 9
  const maxActivitiesPerDay = 8
  const daysToShow = []

  for (let i = 0; i < daysCountToShow; i += 1) {
    daysToShow.push(firstDay.subtract(i, 'days'))
  }

  const result: WeekActvities = daysToShow.map((day) => {
    return {
      contact_date: day.format('YYYY-MM-DD'),
      array: Array.from({ length: Math.ceil(Math.random() * maxActivitiesPerDay) }).map(
        makeRandomActivity
      )
    }
  })

  return HttpResponse.json(result)
})
