import { Request, Response } from 'express'

import logger from '../../logger'
import { translateErrorMessage } from '../../utils'

const addCookie = async (req: Request, res: Response) => {
  try {
    const { lang } = req.body
    res.cookie('language', `${lang}`, {
      secure: false,
      httpOnly: true,
      sameSite: 'lax',
    })
    res.sendStatus(200)
  } catch (e: any) {
    logger.error(`error happend in set cookie: ${e}`)
    res.status(500).send({
      error: translateErrorMessage(req.cookies?.language, 'error happened'),
    })
  }
}

export default addCookie
