import { Status } from './tuya.status'

export interface Device {
  id: string
  ip: string
  name: string
  status: Array<Status>
}
