import axios, { AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import { isEmpty } from 'lodash';

import {
  InvalidSourceError,
  SourceError,
  InvalidTableExtractionSourceError,
  TableExtractionError,
} from '../../common/errors';
import { HTMLService } from '../types/service';
import { Output } from '../../common/types/output';

class HTMLMainService implements HTMLService {
  async getHTMLFromURL(url: string): Promise<Output<string>> {
    const output = {
      data: null,
    } as Output<string>;

    // TODO: Enable this
    try {
      if (isEmpty(url)) {
        output.error = InvalidSourceError;
        return output;
      }

      const response: AxiosResponse<any> = await axios.get(url);

      if (!isEmpty(response.data)) {
        // console.log('data', response.data);
        output.data = response.data;
      }
    } catch (error) {
      output.error = SourceError;
    }

    return output;
  }

  async getFirstNumbersTableColumnFromHTML(html: string): Promise<Output<number[]>> {
    const output = {
      data: null,
    } as Output<number[]>;

    try {
      if (isEmpty(html)) {
        output.error = InvalidTableExtractionSourceError;
        return output;
      }

      const cheerioStatic: CheerioStatic = cheerio.load(html);

      let firstNumericTableIndex: number;
      let firstNumericTableData: CheerioElement;
      let firstNumericColumnIndex: number;
      const numericColumn: number[] = [];

      // Find first matching table & column with number
      cheerioStatic('table').each((tableNumber: number, tableElement: CheerioElement) => {
        for (const tbodyElement of tableElement?.children) {
          if (tbodyElement.name !== 'tbody') {
            continue;
          }

          for (const trElement of tbodyElement?.children) {
            if (trElement.name !== 'tr') {
              continue;
            }

            const tdElements = trElement?.children;
            for (let columnNumber = 0; columnNumber < tdElements?.length; columnNumber++) {
              if (tdElements[columnNumber].name !== 'td') {
                continue;
              }

              const elementWithText = tdElements[columnNumber]?.children?.find(
                (ce: CheerioElement) => {
                  if (ce.type === 'text') {
                    return !Number.isNaN(parseFloat(ce.data));
                  }
                }
              );

              if (isEmpty(firstNumericTableData) && !isEmpty(elementWithText)) {
                firstNumericTableIndex = tableNumber;
                firstNumericColumnIndex = columnNumber;
                firstNumericTableData = elementWithText;
              }
            }
          }
        }
      });

      // Get the whole numeric column
      cheerioStatic('table').each((tableNumber: number, tableElement: CheerioElement) => {
        if (tableNumber === firstNumericTableIndex) {
          for (const tbodyElement of tableElement?.children) {
            if (tbodyElement.name !== 'tbody') {
              continue;
            }

            for (const trElement of tbodyElement?.children) {
              if (trElement.name !== 'tr') {
                continue;
              }

              for (const tdElement of trElement?.children[firstNumericColumnIndex]?.children) {
                if (tdElement.type === 'text') {
                  const data = tdElement.data;
                  const cleansedData = tdElement.data.replace(/[^0-9.]/g, '');
                  const numericData = parseFloat(cleansedData);
                  if (!Number.isNaN(numericData)) {
                    numericColumn.push(numericData);
                  }
                }
              }
            }
          }
        }
      });

      // console.log('firstNumericTableIndex', firstNumericTableIndex);
      // console.log('firstNumericTableData', firstNumericTableData);
      // console.log('firstNumericColumnIndex', firstNumericColumnIndex);
      // console.log('numericColumn', numericColumn);
      output.data = numericColumn;
    } catch (error) {
      console.error(error);
      output.error = TableExtractionError;
    } finally {
      return output;
    }
  }

  async getFirstNumbersDivColumnFromHTML(html: string): Promise<Output<number[]>> {
    const output = {
      data: null,
    } as Output<number[]>;

    try {
      if (isEmpty(html)) {
        output.error = InvalidTableExtractionSourceError;
        return output;
      }
      const cheerioStatic: CheerioStatic = cheerio.load(html);
      let firstNumericDivTableIndex: number;
      let firstNumericDivTableData: CheerioElement;
      let firstNumericDivColumnIndex: number;
      const numericColumn: number[] = [];

      // Find first matching table & column with number
      cheerioStatic('div.table').each((tableNumber: number, tableElement: CheerioElement) => {
        for (const trElement of tableElement?.children) {
          if (
            trElement.name !== 'div' ||
            !trElement.attribs ||
            trElement.attribs['class'] !== 'row'
          ) {
            continue;
          }

          const tdElements = trElement?.children;
          for (let columnNumber = 0; columnNumber < tdElements?.length; columnNumber++) {
            if (
              tdElements[columnNumber].name !== 'div' ||
              !tdElements[columnNumber].attribs ||
              tdElements[columnNumber].attribs['class'] !== 'cell'
            ) {
              continue;
            }

            const elementWithText = tdElements[columnNumber]?.children?.find(
              (ce: CheerioElement) => {
                if (ce.type === 'text') {
                  return !Number.isNaN(parseFloat(ce.data));
                }
              }
            );

            if (isEmpty(firstNumericDivTableData) && !isEmpty(elementWithText)) {
              firstNumericDivTableIndex = tableNumber;
              firstNumericDivColumnIndex = columnNumber;
              firstNumericDivTableData = elementWithText;
            }
          }
        }
      });

      // Get the whole numeric column
      cheerioStatic('div.table').each((tableNumber: number, tableElement: CheerioElement) => {
        if (tableNumber === firstNumericDivTableIndex) {
          for (const trElement of tableElement?.children) {
            if (
              !trElement ||
              trElement.name !== 'div' ||
              !trElement.attribs ||
              trElement.attribs['class'] !== 'row' ||
              isEmpty(trElement?.children) ||
              isEmpty(trElement?.children[firstNumericDivColumnIndex]) ||
              isEmpty(trElement?.children[firstNumericDivColumnIndex].children)
            ) {
              continue;
            }

            for (const tdElement of trElement?.children[firstNumericDivColumnIndex]?.children) {
              if (tdElement.type === 'text') {
                const data = tdElement.data;
                const cleansedData = tdElement.data.replace(/[^0-9.]/g, '');
                const numericData = parseFloat(cleansedData);
                if (!Number.isNaN(numericData)) {
                  numericColumn.push(numericData);
                }
              }
            }
          }
        }
      });

      // console.log('firstNumericDivTableIndex', firstNumericDivTableIndex);
      // console.log('firstNumericDivTableData', firstNumericDivTableData);
      // console.log('firstNumericDivColumnIndex', firstNumericDivColumnIndex);
      // console.log('numericColumn', numericColumn);
      output.data = numericColumn;
    } catch (error) {
      console.error(error);
      output.error = TableExtractionError;
    } finally {
      return output;
    }
  }
}

export { HTMLMainService };
