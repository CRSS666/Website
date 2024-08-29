export enum Roles {
  Admin = 1 << 0,
  Plus = 1 << 1
}

export enum Role {
  Owner = 'owner',
  Admin = 'admin',
}

export function hasRole(permissions: number, role: Roles): boolean {
  return (permissions & role) === role;
}