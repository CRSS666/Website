import type { NextApiRequest, NextApiResponse } from 'next';

type Error = {
  message: string;
};

interface ServerInfo {
  version: string;
  online: number;
  worlds: string[];
}

import * as net from 'node:net';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerInfo | Error>,
) {
  try {
    const mc_api = process.env.MC_API!.split(':');

    const socket = net.createConnection({
      host: mc_api[0],
      port: parseInt(mc_api[1]),
    }, async () => {
      const reqData = Buffer.alloc(1 + 4);

      reqData.writeInt8(0x00, 0);
      reqData.writeUint32BE(0, 1);

      socket.write(reqData);

      socket.on('data', (data) => {
        const packetId = data[0];
        const length   = data.readUInt32BE(1); // unused but in case someone wants to verify the lenght :3

        if (packetId !== 0x00) {
          socket.end();

          return res.status(500).json({ message: 'There was an error with the server.' });
        }

        const jsonData = data.toString('utf-8', 5);

        socket.end();

        res.status(200).json(JSON.parse(jsonData));
      });

      socket.on('error', (err) => {
        console.error(err);

        socket.end();

        res.status(500).json({ message: 'There was an error with the server.' });
      });
    });
  } catch (e) {
    res.status(500).json({ message: 'There was an error with the server.' });
  }
}
