import { HttpRequest, HttpResponse } from '../protocols/https'
import { badResquest } from '../helpers/http-helper'
import { MissingParamError } from '../error/missingparamerror'
import { Controller } from '../protocols/controller'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badResquest(new MissingParamError(field))
      }
    }
  }
}
