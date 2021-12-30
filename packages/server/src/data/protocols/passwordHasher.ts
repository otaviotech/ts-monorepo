export interface PasswordHasher {
  hash(password: string): Promise<string>;
}
