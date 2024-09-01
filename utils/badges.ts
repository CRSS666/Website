export enum TeamRole {
  Owner = 'owner',
  Admin = 'admin',
  Moderator = 'mod'
}

export enum Badge {
  Old = 1 << 0, // CRSS OG
  Supporter = 1 << 1, // "Donator"
}

export function getBadges(badges: number): Badge[] {
  const result: Badge[] = [];

  if ((badges & Badge.Old) === Badge.Old) {
    result.push(Badge.Old);
  }

  if ((badges & Badge.Supporter) === Badge.Supporter) {
    result.push(Badge.Supporter);
  }

  return result;
}