export class UsernameAlreadyTakenError extends Error {
  constructor() {
    super();
    this.name = 'UsernameAlreadyTakenError';
  }
}
