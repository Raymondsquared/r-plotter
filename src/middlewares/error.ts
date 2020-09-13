/* eslint-disable @typescript-eslint/ban-types */

import {
  Request as expressRequest,
  Response as expressResponse,
  NextFunction as expressNextFunction,
} from 'express';

import { Output } from '../modules/common/types/output';
import { PlotterError } from '../modules/common/types/error';

// errorAdapterMiddleware will catch error thrown by the handlers
// Wrap error / AppointmentError into ACResponse
const errorAdapterMiddleware = function errorAdaptingMiddlewareHandler(
  error: Error,
  request: expressRequest,
  response: expressResponse,
  nextFunc: expressNextFunction
): void {
  let plotterError: PlotterError;
  if (error instanceof PlotterError) {
    plotterError = error;
  } else {
    if ((error as any).status as number) {
      plotterError = new PlotterError(error.message, (error as any).status);
    } else {
      plotterError = new PlotterError(error.message);
    }
  }

  const output: Output<any> = {
    error: {
      code: plotterError.code,
      httpStatusCode: plotterError.httpStatusCode,
      message: plotterError.message,
    } as PlotterError,
  };
  response.status(plotterError.httpStatusCode).send(output);
};

// TODO: Publish to log stream
const errorLoggingMiddleware = function errorLoggingMiddlewareHandler(
  error: Error,
  request: expressRequest,
  response: expressResponse,
  nextFunc: expressNextFunction
): void {
  console.error('Error caught from middleware:', error);
  nextFunc(error);
};

export { errorAdapterMiddleware, errorLoggingMiddleware };
