import { HttpRequest, HttpResponse } from '../protocols/https'
import { badResquest } from '../helpers/http-helper'
import { MissingParamError } from '../error/missingparamerror'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badResquest(new MissingParamError(field))
      }
    }
  }
}
