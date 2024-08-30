export enum Permission {
  Admin = 1 << 0
}

export enum Role {
  Owner = 'owner',
  Admin = 'admin',
}

export function hasPermission(permissions: number, permission: Permission): boolean {
  return (permissions & permission) === permission;
}