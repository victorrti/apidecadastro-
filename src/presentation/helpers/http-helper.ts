import { HttpResponse } from '../protocols/https'
export const badResquest = (error: Error): HttpResponse => (
  {
    statusCode: 400,
    body: error

  }
)
