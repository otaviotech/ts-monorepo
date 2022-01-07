export interface PasswordHashComparer {
  compare(left: string, right: string): Promise<boolean>;
}
