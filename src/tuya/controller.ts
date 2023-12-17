import { Request, Response, RequestHandler } from 'express'
import * as TuyaService from './service/tuya.service'

interface ITuyaController {
  power: RequestHandler
}

class TuyaController implements ITuyaController {
  power: RequestHandler = async (req: Request, res: Response) => {
    try {
      const devices = process.env.DEVICE_ID as string

      const status = await TuyaService.switchStatus([devices])

      res.status(200).send({
        success: true,
        message: 'OK',
        status: status
      })
    } catch (e) {
      res.status(500).send({
        success: false,
        message: e,
        status: 'unknown'
      })
    }
  }
}

export const tuyaController = new TuyaController()
