import { type WeekActvities } from '../types.ts'

export const apiUrl = window.location.toString()
export const baseUrl = apiUrl + '/api'

const get = async (endpoint: string, query: Record<string, string>) => {
  const url = new URL(`${baseUrl}${endpoint}`)
  for (const key in query) {
    url.searchParams.append(key, query[key])
  }
  const response = await fetch(url.toString(), {
    method: 'GET'
  })
  const json = await response.json()

  return json
}

export const getWeek = async (startDate: string): Promise<WeekActvities> =>
  get('/receive_week', {
    start_date: startDate
  })
