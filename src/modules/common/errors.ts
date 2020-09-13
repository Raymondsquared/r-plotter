import { PlotterError } from './types/error';

const InvalidPlotter = new PlotterError('Invalid Plotter', 600);
const InvalidSourceError = new PlotterError('Invalid URL Error', 601, 400);
const SourceError = new PlotterError('Source Error', 602);
const InvalidTableExtractionSourceError = new PlotterError(
  'Invalid Table Extraction Source Error',
  603,
  400
);
const TableExtractionError = new PlotterError('Table Extraction Error', 604);

export {
  InvalidPlotter,
  InvalidSourceError,
  SourceError,
  InvalidTableExtractionSourceError,
  TableExtractionError,
};
