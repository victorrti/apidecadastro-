import { HttpRequest, HttpResponse } from '../protocols/https'
import { badResquest } from '../helpers/http-helper'
import { MissingParamError } from '../error/missingparamerror'
import { InvalidParamError } from '../error/Invalidparamerror'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/EmailValidator'
import { ServerError } from '../error/ServerError'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badResquest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badResquest(new InvalidParamError('email'))
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()

      }
    }
  }
}
