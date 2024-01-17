export type Activity = {
  id: number
  created_at: number
  name: string
  img: string
  position: string
  city: string
  _orbits_last_message: {
    message: string
    message_head: string
  }
}

export type DayActivities = {
  array: Activity[]
  contact_date: string
}

export type WeekActvities = DayActivities[]
