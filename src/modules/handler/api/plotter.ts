import {
  RequestHandler as expressRequestHandler,
  Request as expressRequest,
  Response as expressResponse,
  NextFunction as expressNextFunction,
} from 'express';

import { Output } from '../../common/types/output';
import { PlotterError } from '../../common/types/error';
import { HTMLService } from '../../html/types/service';
import { HTMLMainService } from '../../html/services/html';

const htmlService: HTMLService = new HTMLMainService();

// url=https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression
const getManyNumbers: expressRequestHandler = async function getManyNumbers(
  request: expressRequest,
  response: expressResponse,
  nextFunc: expressNextFunction
) {
  try {
    let output: Output<number[]> = { data: null };

    const urlQuery = request?.query?.url as string;
    // console.log('urlQuery', urlQuery);
    if (urlQuery) {
      // Extract
      const outputString: Output<string> = await htmlService.getHTMLFromURL(urlQuery);
      if (outputString.error) {
        throw outputString.error;
      }

      // Transform
      const outputNumbers: Output<number[]> = await htmlService.getFirstNumbersTableColumnFromHTML(
        outputString.data
      );
      if (outputNumbers.error) {
        throw outputNumbers.error;
      } else {
        output = outputNumbers;
        response.send(outputNumbers);
        return;
      }

      // Loading: Return it to Plotter UI for a plot
    }
    response.send(output);
  } catch (error) {
    console.log('Failed getting many numbers');
    if (error instanceof PlotterError === false) {
      error = new PlotterError(error.message);
    }
    nextFunc(error);
  }
};

export { getManyNumbers };
