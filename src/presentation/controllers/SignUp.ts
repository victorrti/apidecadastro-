import { HttpRequest, HttpResponse } from '../protocols/https'
import { badResquest } from '../helpers/http-helper'
import { MissingParamError } from '../error/missingparamerror'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badResquest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return badResquest(new MissingParamError('email'))
    }
  }
}
