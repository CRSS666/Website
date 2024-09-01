export enum Permission {
  SuperAdmin = 1 << 0,
  Admin = 1 << 1,
  ServerPlayer = 1 << 2
}

export enum Role {
  Owner = 'owner',
  Admin = 'admin',
}

export function hasPermission(permissions: number, permission: Permission): boolean {
  return (permissions & permission) === permission;
}