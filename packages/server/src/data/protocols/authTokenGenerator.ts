export interface AuthTokenGenerator {
  generate(payload: any): Promise<string>;
}
