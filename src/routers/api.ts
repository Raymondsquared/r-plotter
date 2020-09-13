// External modules
import {
  Router as expressRouter,
  Request as expressRequest,
  Response as expressResponse,
  NextFunction as expressNextFunction,
} from 'express';

import { getManyNumbers, getOnePlotImage } from '../modules/handler/api/plotter';

const router = expressRouter();

router.get(
  '/health-check',
  async (request: expressRequest, response: expressResponse, nextFunc: expressNextFunction) => {
    response.send('healthy');
  }
);

router.get('/api/v1/plotter/numbers', getManyNumbers);
router.get('/api/v1/plotter/image', getOnePlotImage);

export default router;
