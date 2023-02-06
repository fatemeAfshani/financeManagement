import request from 'supertest'
import app from '../app'

export const postRequest = async (
  route: string,
  body: object
): Promise<request.Response> => {
  const response = await request(app).post(route).send(body)
  return response
}

export const getRequest = async (
  route: string,
  query: object
): Promise<request.Response> => {
  let queryString = ''
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      queryString = `${queryString}${key}=${query[key as keyof object]}&`
    }
  }
  queryString = queryString.substring(0, queryString.length - 1)
  const response = await request(app).get(`${route}?${queryString}`)
  return response
}

export const deleteRequest = async (
  route: string
): Promise<request.Response> => {
  const response = await request(app).delete(route)
  return response
}
