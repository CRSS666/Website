export enum Permission {
  SuperAdmin = 1 << 0,
  Admin = 1 << 1,
  ServerPlayer = 1 << 2
}

export enum PermissionNamed {
  SuperAdmin = 'super_admin',
  Admin = 'admin',
  ServerPlayer = 'server_player'
}

export function hasPermission(permissions: number, permission: Permission): boolean {
  return (permissions & permission) === permission;
}

export function getPermissions(permissions: number): PermissionNamed[] {
  const result: PermissionNamed[] = [];

  if ((permissions & Permission.SuperAdmin) === Permission.SuperAdmin) {
    result.push(PermissionNamed.SuperAdmin);
  }

  if ((permissions & Permission.Admin) === Permission.Admin) {
    result.push(PermissionNamed.Admin);
  }

  if ((permissions & Permission.ServerPlayer) === Permission.ServerPlayer) {
    result.push(PermissionNamed.ServerPlayer);
  }

  return result;
}