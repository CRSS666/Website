import { ErrorResponse, TeamMember, User } from '@/interfaces';

import Database from '@/lib/Database';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TeamMember[] | ErrorResponse>,
) {
  const db = new Database();

  try {
    let team: any[] = await db.getTeam();

    team = team.map((member: TeamMember) => {
      return {
        ...member,
        email: undefined,
        discordId: undefined,

        createdAt: new Date(member.createdAt).getTime(),
        updatedAt: new Date(member.updatedAt).getTime()
      };
    });

    res.status(200).json(team);
  } catch (e) {
    console.error(e);

    res.status(500).json({
      code: 500,
      message: 'Internal Server Error'
    });
  }
}