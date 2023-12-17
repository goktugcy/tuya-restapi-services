import express from 'express'
import { tuyaController } from '../tuya/controller'

export const createRoutes = async () => {
  const router = express.Router()

  router.get('/switchdevices', tuyaController.power)

  return router
}
