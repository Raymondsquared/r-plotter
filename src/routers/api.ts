// External modules
import {
  Router as expressRouter,
  Request as expressRequest,
  Response as expressResponse,
  NextFunction as expressNextFunction,
} from 'express';

const router = expressRouter();

router.get(
  '/health-check',
  async (request: expressRequest, response: expressResponse, nextFunc: expressNextFunction) => {
    response.send('healthy');
  }
);

export default router;
