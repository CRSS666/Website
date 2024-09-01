export interface User {
  id: BigInt;

  username: string;
  displayName: string;

  email?: string;

  avatar?: string;
  banner?: string;

  accentColor?: number;

  permissions: number;
  badges: number;
}