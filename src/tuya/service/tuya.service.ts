import { Device } from '../model/tuya.device'
import { TuyaContext } from '@tuya/tuya-connector-nodejs'
import dotenv from 'dotenv'
dotenv.config()

const tuya = new TuyaContext({
  baseUrl: 'https://openapi.tuyaeu.com',
  accessKey: process.env.CLIENT_ID as string,
  secretKey: process.env.CLIENT_SECRET as string,
  version: 'v2'
})

/**
 * Service Methods
 */
export const switchStatus = async (devices: Array<string>): Promise<null | boolean> => {
  try {
    const response = await tuya.request({
      method: 'GET',
      path: '/v1.0/devices/' + devices[0]
    })

    const lamp = response.result as Device
    const currentStatus = getSwitchStatus(lamp)

    const switchPromises = devices.map(async (device) => {
      await tuya.request({
        method: 'POST',
        path: '/v1.0/devices/' + device + '/commands',
        body: {
          commands: [
            {
              code: process.env.SWITCH_COMMAND,
              value: !currentStatus
            }
          ]
        }
      })
      console.log(`${device} changed from ${currentStatus} to ${!currentStatus}`)
    })

    await Promise.all(switchPromises)

    return !currentStatus
  } catch (error) {
    console.log(error)
    return null
  }
}

function getSwitchStatus(lamp: Device) {
  for (const element of lamp.status) {
    if (process.env.SWITCH_COMMAND === element.code) {
      return element.value
    }
  }
  return false
}
