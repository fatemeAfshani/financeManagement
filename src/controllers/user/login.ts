import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import userDb from '../../database/user'
import logger from '../../logger'
import { User } from '../../types'
import { checkPassword, translateErrorMessage } from '../../utils'

const createToken = ({ username, id, role, companyId }: User) =>
  jwt.sign(
    {
      data: {
        username,
        id,
        role,
        companyId,
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env.JWT_TOKEN!,
    { expiresIn: '1h' }
  )

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    const user = (await userDb.get({ username }))?.[0]

    if (!user) {
      return res
        .status(401)
        .send({ error: translateErrorMessage('invalid login') })
    }
    const passwordMatch = await checkPassword(password, user.password)
    if (!passwordMatch) {
      return res
        .status(401)
        .send({ error: translateErrorMessage('invalid login') })
    }
    const token = createToken(user)
    logger.info(`customer login with username: ${username}`)
    res.status(200).send({ username, token })
  } catch (error) {
    logger.error(`error happend in login customer ${error}`)
    res.status(500).send({ error: translateErrorMessage('error happened') })
  }
}

export default login
