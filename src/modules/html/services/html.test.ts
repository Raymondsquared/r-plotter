import {
  InvalidSourceError,
  SourceError,
  InvalidTableExtractionSourceError,
} from '../../common/errors';
import { HTMLMainService } from './html';
import { Output } from '../../common/types/output';
import { HTMLService } from '../types/service';
import { defaultTestData } from './data';

const htmlService: HTMLService = new HTMLMainService();

describe('GIVEN `getHTMLFromURL` method in `HTMLMainService` module', () => {
  describe('WHEN it is invoked with empty input', () => {
    it('THEN it should return invalid output', async () => {
      const expectedOutput: Output<string> = {
        error: InvalidSourceError,
        data: null,
      };

      expect(await htmlService.getHTMLFromURL(undefined)).toEqual(expectedOutput);
      expect(await htmlService.getHTMLFromURL(null)).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with invalid input', () => {
    it('THEN it should return invalid output', async () => {
      const randomURL = 'random-url';
      const invalidURL = 'https://did9hrg18lno9.cloudfront.net/random-path';
      const expectedOutput: Output<string> = {
        error: SourceError,
        data: null,
      };

      expect(await htmlService.getHTMLFromURL(randomURL)).toEqual(expectedOutput);
      expect(await htmlService.getHTMLFromURL(invalidURL)).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with valid URL', () => {
    it('THEN it should return valid output', async () => {
      const validURL = 'https://did9hrg18lno9.cloudfront.net/health-check';
      const expectedOutput: Output<string> = {
        data: 'healthy',
      };

      expect(await htmlService.getHTMLFromURL(validURL)).toEqual(expectedOutput);
    });
  });
});

describe('GIVEN `getFirstNumbersTableColumnFromHTML` method in `HTMLMainService` module', () => {
  describe('WHEN it is invoked with empty input', () => {
    it('THEN it should return invalid output', async () => {
      const expectedOutput: Output<number[]> = {
        error: InvalidTableExtractionSourceError,
        data: null,
      };

      expect(await htmlService.getFirstNumbersTableColumnFromHTML(undefined)).toEqual(
        expectedOutput
      );
      expect(await htmlService.getFirstNumbersTableColumnFromHTML(null)).toEqual(expectedOutput);
      expect(await htmlService.getFirstNumbersTableColumnFromHTML('')).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with invalid input structure', () => {
    it('THEN it should return invalid output', async () => {
      const noTableInput = '<html></html>';
      const justTableInput = '<table></table>';
      const justTBodyInput = '<table><tbody></tbody></table>';
      const justTRInput = '<table><tbody><tr></tr></tbody></table>';
      const invalidTableWithNumberInput = '<table><tbody><tr>123</tr></tbody></table>';
      const expectedOutput: Output<number[]> = {
        data: [],
      };

      expect(await htmlService.getFirstNumbersTableColumnFromHTML(noTableInput)).toEqual(
        expectedOutput
      );
      expect(await htmlService.getFirstNumbersTableColumnFromHTML(justTableInput)).toEqual(
        expectedOutput
      );
      expect(await htmlService.getFirstNumbersTableColumnFromHTML(justTBodyInput)).toEqual(
        expectedOutput
      );
      expect(await htmlService.getFirstNumbersTableColumnFromHTML(justTRInput)).toEqual(
        expectedOutput
      );
      expect(
        await htmlService.getFirstNumbersTableColumnFromHTML(invalidTableWithNumberInput)
      ).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with no number', () => {
    it('THEN it should return invalid output', async () => {
      const justTDInput = '<table><tbody><tr><td></td></tr></tbody></table>';
      const noNumberInput = '<table><tbody><tr><td>abc</td></tr></tbody></table>';
      const expectedOutput: Output<number[]> = {
        data: [],
      };

      expect(await htmlService.getFirstNumbersTableColumnFromHTML(justTDInput)).toEqual(
        expectedOutput
      );
      expect(await htmlService.getFirstNumbersTableColumnFromHTML(noNumberInput)).toEqual(
        expectedOutput
      );
    });
  });

  describe('WHEN it is invoked with one number column', () => {
    it('THEN it should return invalid output', async () => {
      const oneNumberInput = '<table><tbody><tr><td>123</td></tr></tbody></table>';
      const oneNumberAndStringInput = '<table><tbody><tr><td>123 meter</td></tr></tbody></table>';
      const expectedOutput: Output<number[]> = {
        data: [123],
      };

      expect(await htmlService.getFirstNumbersTableColumnFromHTML(oneNumberInput)).toEqual(
        expectedOutput
      );
      expect(await htmlService.getFirstNumbersTableColumnFromHTML(oneNumberAndStringInput)).toEqual(
        expectedOutput
      );
    });
  });

  describe('WHEN it is invoked with one number column', () => {
    it('THEN it should return invalid output', async () => {
      const oneNumberColumnInput =
        '<table><tbody><tr><td>123</td></tr><tr><td>234.1</td></tr></tbody></table>';
      const oneNumberAndStringColumnInput =
        '<table><tbody><tr><td>123 meter</td></tr><tr><td>234.1 meter</td></tr></tbody></table>';
      const expectedOutput: Output<number[]> = {
        data: [123, 234.1],
      };

      expect(await htmlService.getFirstNumbersTableColumnFromHTML(oneNumberColumnInput)).toEqual(
        expectedOutput
      );
      expect(
        await htmlService.getFirstNumbersTableColumnFromHTML(oneNumberAndStringColumnInput)
      ).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with one number column', () => {
    it('THEN it should return invalid output', async () => {
      const oneNumberColumnInput =
        '<table><tbody><tr><td>123</td></tr><tr><td>234.1</td></tr></tbody></table>';
      const oneNumberAndStringColumnInput =
        '<table><tbody><tr><td>123 meter</td></tr><tr><td>234.1 meter</td></tr></tbody></table>';
      const expectedOutput: Output<number[]> = {
        data: [123, 234.1],
      };

      expect(await htmlService.getFirstNumbersTableColumnFromHTML(oneNumberColumnInput)).toEqual(
        expectedOutput
      );
      expect(
        await htmlService.getFirstNumbersTableColumnFromHTML(oneNumberAndStringColumnInput)
      ).toEqual(expectedOutput);
    });
  });

  describe('WHEN it is invoked with multiple tables', () => {
    it('THEN it should return invalid output', async () => {
      const firstTable =
        '<table><tbody><tr><td>123</td></tr><tr><td>234</td></tr></tbody></table><table><tbody><tr><td>abc</td></tr></tbody></table>';
      const lastTable =
        '<table><tbody><tr><td>abc</td></tr></tbody></table><table><tbody><tr><td>123</td></tr><tr><td>234</td></tr></tbody></table>';
      const expectedOutput: Output<number[]> = {
        data: [123, 234],
      };

      expect(await htmlService.getFirstNumbersTableColumnFromHTML(firstTable)).toEqual(
        expectedOutput
      );
      expect(await htmlService.getFirstNumbersTableColumnFromHTML(lastTable)).toEqual(
        expectedOutput
      );
    });
  });

  describe('WHEN it is invoked with sample data', () => {
    it('THEN it should return invalid output', async () => {
      const expectedOutput: Output<number[]> = {
        data: [
          1.464,
          1.4854,
          1.4854,
          1.5245,
          1.5525,
          1.585,
          1.585,
          1.5955,
          1.6055,
          1.625,
          1.6555,
          1.6555,
          1.665,
          1.665,
          1.665,
          1.715,
          1.725,
          1.735,
          1.745,
          1.755,
          1.765,
          1.765,
          1.775,
          1.785,
          1.85,
          1.815,
          1.825,
          1.836,
          1.846,
          1.856,
          1.866,
          1.876,
          1.8862,
          1.906,
          1.916,
          1.926,
          1.926,
          1.946,
          1.946,
          1.956,
          1.966,
          1.966,
          1.976,
          1.976,
          2.006,
          2.016,
          2.016,
          2.026,
          2.0368,
          2.0368,
          2.046,
          2.056,
          2.076,
          2.076,
          2.0861,
          2.096,
        ],
      };

      expect(await htmlService.getFirstNumbersTableColumnFromHTML(defaultTestData)).toEqual(
        expectedOutput
      );
    });
  });
});
