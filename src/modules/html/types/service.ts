import { Output } from '../../common/types/output';

interface HTMLService {
  getHTMLFromURL(url: string): Promise<Output<string>>;
  getFirstNumbersTableColumnFromHTML(html: string): Promise<Output<number[]>>;
  getFirstNumbersDivColumnFromHTML(html: string): Promise<Output<number[]>>;
}

export { HTMLService };
