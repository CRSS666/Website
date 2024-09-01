class Discord {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async user(): Promise<{ ok: boolean, data?: any }> {
    const res = await fetch(`${process.env.DISCORD_API}/users/@me`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      }
    });

    return {
      ok: res.ok,
      data: res.ok ? await res.json() : null,
    };
  }
}

export default Discord;