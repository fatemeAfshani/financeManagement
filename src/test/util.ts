import request from 'supertest'
import app from '../app'

const postRequest = async (
  route: string,
  body: object
): Promise<request.Response> => {
  const response = await request(app).post(route).send(body)
  return response
}

export default postRequest
