export type Status = 'Visited' | 'Pending'

export type BedroomStatus = 'cluttered' | 'tidy' | 'neat' | 'rubbish dump' | 'spotless'

export enum BedroomStatusValues {
  'rubbish dump' = 1,
  'cluttered' = 2,
  'tidy' = 3,
  'neat' = 4,
  'spotless' = 5,
}
export interface Kid {
  conditionOfBedroom?: BedroomStatus
  fairyId?: string | number
  id: string
  moneyLeft: boolean
  country: string
  status: Status
  avatar: string
  notes?: string
  seen?: boolean
  name: string
  age: number
}

export type Kids = Kid[]

export interface Fairy {
  id: number | string
  name: string
  description: string
  avatar: string
}

export type Fairies = Fairy[]
