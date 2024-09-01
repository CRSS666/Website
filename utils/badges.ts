export enum TeamRole {
  Owner = 'owner',
  Admin = 'admin',
  Moderator = 'mod'
}

export enum Badge {
  Old = 1 << 0, // CRSS OG
  Supporter = 1 << 1, // "Donator"
}

export enum BadgeNamed {
  Old = 'og',
  Supporter = 'supporter',
}

export function getBadges(badges: number): BadgeNamed[] {
  const result: BadgeNamed[] = [];

  if ((badges & Badge.Old) === Badge.Old) {
    result.push(BadgeNamed.Old);
  }

  if ((badges & Badge.Supporter) === Badge.Supporter) {
    result.push(BadgeNamed.Supporter);
  }

  return result;
}