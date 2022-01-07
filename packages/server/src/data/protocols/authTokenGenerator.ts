export interface AuthTokenGenerator {
  generateAuthToken(payload: any): Promise<string>;
}
