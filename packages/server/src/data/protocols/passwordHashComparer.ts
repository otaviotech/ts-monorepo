export interface PasswordHashComparer {
  comparePasswords(left: string, right: string): Promise<boolean>;
}
