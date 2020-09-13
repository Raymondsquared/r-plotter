// PlotterError represents error thrown by appointment microservices
// REF: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
class PlotterError extends Error {
  code: number;
  httpStatusCode: number;

  constructor(errorString: string, code = 500, httpStatusCode = 500) {
    super(errorString);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, PlotterError.prototype);

    this.code = code;
    this.httpStatusCode = httpStatusCode;
  }
}

export { PlotterError };
