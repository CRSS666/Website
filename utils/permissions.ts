export enum Permission {
  SuperAdmin = 1 << 0,
  Admin = 1 << 1,
  ServerPlayer = 1 << 2
}

export function hasPermission(permissions: number, permission: Permission): boolean {
  return (permissions & permission) === permission;
}