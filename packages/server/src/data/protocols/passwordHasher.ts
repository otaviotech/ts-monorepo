export interface PasswordHasher {
  hashPassword(password: string): Promise<string>;
}
