import { Request, Response } from 'express'
import UserDB from '../../database/user'
import logger from '../../logger'
import { User } from '../../types'
import { translateErrorMessage } from '../../utils'

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { companyId } = req.user as User
    const user = await UserDB.deleteOne(+id, companyId)
    if (user) {
      res.sendStatus(200)
    } else {
      res.status(404).send({
        error: translateErrorMessage(req.cookies?.language, 'user not found'),
      })
    }
  } catch (e) {
    logger.error(`error happend in delete user: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default deleteUser
