export class EmailAreadyTakenError extends Error {
  constructor() {
    super();
    this.name = 'EmailAlreadyTakenError';
  }
}
