import { HttpStatus } from '@nestjs/common';

export type typeHttpResponse<T> =
  | {
      statusCode: HttpStatus.OK;
      data?: T | null;
    }
  | {
      statusCode: HttpStatus.CREATED;
      data: T;
    }
  | {
      statusCode: HttpStatus.BAD_REQUEST;
      message: string;
    }
  | {
      statusCode: HttpStatus.NOT_FOUND;
      message: string;
    }
  | {
      statusCode: HttpStatus.NOT_ACCEPTABLE;
      message: string;
    }
  | {
      statusCode: HttpStatus.NO_CONTENT;
      message: string;
    }
  | {
      statusCode: HttpStatus.UNAUTHORIZED;
      message: string;
    }
  | {
      statusCode: HttpStatus.EXPECTATION_FAILED;
      message: string;
    };
