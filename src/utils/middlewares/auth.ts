import { NextFunction, Request, Response } from 'express'

import jwt, { JwtPayload } from 'jsonwebtoken'
import logger from '../../logger'
import userDB from '../../database/user'
import { Roles, User } from '../../types'
import { translateErrorMessage } from '..'

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.header('Authorization')?.replace('Bearer ', '')
    if (!authorization) return res.sendStatus(401)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { data }: any = jwt.verify(authorization, process.env.JWT_TOKEN!)
    if (!data) return res.sendStatus(401)

    const user = (
      await userDB.get({ username: data.username, id: data.id })
    )?.[0]
    if (!user) return res.sendStatus(401)

    req.token = authorization
    req.user = user
    next()
  } catch (error) {
    logger.error(`error in authorization middleware, ${error}`)
    return res.sendStatus(401)
  }
}

export const hasAdminAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.user as User
    if (role !== Roles.ADMIN) {
      return res.status(401).send({
        error: translateErrorMessage(
          'you dont have access to do this operation'
        ),
      })
    }
    next()
  } catch (error) {
    logger.error(`error in authorization middleware, ${error}`)
    return res.sendStatus(401)
  }
}

export const hasViewerAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.user as User
    if (role !== Roles.ADMIN && role !== Roles.VIEWER) {
      return res.status(401).send({
        error: translateErrorMessage(
          'you dont have access to do this operation'
        ),
      })
    }
    next()
  } catch (error) {
    logger.error(`error in authorization middleware, ${error}`)
    return res.sendStatus(401)
  }
}
