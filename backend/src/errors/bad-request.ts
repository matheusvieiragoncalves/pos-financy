import { AppError } from './app-error';

export class BadRequestError extends AppError {
  constructor(
    message = 'Requisição inválida',
    code = 'BAD_REQUEST',
    statusCode = 400
  ) {
    super(message, code, statusCode);
  }
}
