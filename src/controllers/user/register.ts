import { Request, Response } from 'express'
import moment from 'jalali-moment'

import userDB from '../../database/user'
import companyDB from '../../database/company'
import logger from '../../logger'
import { Roles } from '../../types'
import { enCodePassword, translateErrorMessage } from '../../utils'

const register = async (req: Request, res: Response) => {
  try {
    const { username, password, companyName, role } = req.body
    let { companyId } = req.body

    const hashedPassword = enCodePassword(password)
    if (companyName) {
      if (role !== Roles.ADMIN) {
        return res.status(400).send({
          error: translateErrorMessage('company creator must have admin role'),
        })
      }

      const company = (
        await companyDB.add({
          name: companyName,
          createdAt: moment().format('jYYjMMjDD'),
        })
      )?.[0]

      companyId = company.id

      logger.info(
        `create new company with name: ${companyName} and id: ${companyId}`
      )
    }
    if (!companyId) {
      return res
        .status(400)
        .send({ error: translateErrorMessage('no company found') })
    }

    await userDB.add({
      username,
      password: hashedPassword,
      role,
      companyId,
    })

    logger.info(`customer registered with username: ${username}`)
    res.status(200).send({ username, companyId })
  } catch (error) {
    logger.error(`error happend in registring customer ${error}`)
    res.status(500).send({ error: translateErrorMessage('error happened') })
  }
}

export default register
