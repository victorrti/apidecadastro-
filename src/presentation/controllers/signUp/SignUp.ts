import { HttpRequest, HttpResponse, EmailValidator, Controller, AddAccount } from './signUp-protocols'
import { badResquest, serverError } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addaccount: AddAccount
  constructor (emailValidator: EmailValidator, addaccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addaccount = addaccount
  }

  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badResquest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badResquest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badResquest(new InvalidParamError('email'))
      }
      this.addaccount.add({
        name,
        email,
        password

      })
    } catch (error) {
      return serverError()
    }
  }
}
