import { type WeekActvities } from '../types.ts'

const baseUrl = 'https://xwmi-5dlx-wkyj.t7.xano.io/api:oUvfVMO5'

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
