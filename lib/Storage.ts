import { ObjectCannedACL, PutObjectCommand, PutObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';

import { Readable } from 'node:stream';

class S3Storage {
  private client;

  // change this if it's different for you :3
  private bucket: string = 'crss';

  constructor() {
    this.client = new S3Client({
      forcePathStyle: false,

      region: process.env.S3_REGION!,
      endpoint: process.env.S3_ENDPOINT!,

      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!
      }
    });
  }

  async uploadFile(key: string, file: (string | Uint8Array | Buffer | Readable), contetnType: string): Promise<PutObjectCommandOutput> {
    const res = await this.client.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file,
      ContentType: contetnType,
      ACL: ObjectCannedACL.public_read
    }));

    return res;
  }
}

export default S3Storage;