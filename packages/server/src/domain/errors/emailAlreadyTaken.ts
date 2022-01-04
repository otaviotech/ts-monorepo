export class EmailAlreadyTakenError extends Error {
  constructor() {
    super();
    this.name = 'EmailAlreadyTakenError';
  }
}
