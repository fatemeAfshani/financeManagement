import { Request, Response } from 'express'
import moment from 'jalali-moment'
import { uuid } from 'uuidv4'

import userDB from '../../database/user'
import companyDB from '../../database/company'
import logger from '../../logger'
import { Roles } from '../../types'
import { enCodePassword, translateErrorMessage } from '../../utils'

const register = async (req: Request, res: Response) => {
  try {
    const { username, password, companyName, code } = req.body
    let companyId
    let role = Roles.VIEWER
    const hashedPassword = enCodePassword(password)
    if (companyName) {
      const company = (
        await companyDB.add({
          name: companyName,
          createdAt: moment().format('jYYjMMjDD'),
          uuid: uuid(),
        })
      )?.[0]

      companyId = company.id
      role = Roles.ADMIN

      logger.info(
        `create new company with name: ${companyName} and id: ${companyId}`
      )
    } else if (code) {
      const company = (await companyDB.get({ uuid: code }))?.[0]
      if (!company || company.uuid !== code) {
        return res.status(400).send({
          error: translateErrorMessage(
            req.cookies?.language,
            'no company found'
          ),
        })
      }
      companyId = company.id
    }

    if (!companyId) {
      return res.status(400).send({
        error: translateErrorMessage(req.cookies?.language, 'no company found'),
      })
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
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default register
