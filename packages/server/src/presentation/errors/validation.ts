export class RequestValidationError extends Error {
  data: any;

  constructor(msg, data?) {
    super(msg);
    this.data = data;
    this.name = 'RequestValidationError';
  }
}
