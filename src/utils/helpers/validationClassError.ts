import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) {
      const validationErrors = exception.getResponse()['message'];

      if (Array.isArray(validationErrors) && validationErrors.length !== 0) {
        const message = validationErrors.join('. ');

        return response.status(400).json({
          statusCode: 400,
          message,
        });
      }
    }

    return response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
