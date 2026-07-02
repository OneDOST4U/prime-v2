import { Client } from 'minio';
import type { Readable } from 'stream';

let _client: Client | null = null;

export function getMinioClient(): Client {
  if (!_client) {
    const endpoint = process.env.MINIO_ENDPOINT;
    const accessKey = process.env.MINIO_ACCESS_KEY;
    const secretKey = process.env.MINIO_SECRET_KEY;
    if (!endpoint || !accessKey || !secretKey) {
      throw new Error('MinIO configuration missing');
    }
    // Parse endpoint: may be "host:port" or just "host"
    const [host, portStr] = endpoint.split(':');
    const port = portStr ? parseInt(portStr, 10) : 9000;
    _client = new Client({
      endPoint: host,
      port,
      useSSL: false,
      accessKey,
      secretKey,
    });
  }
  return _client;
}

export async function uploadFile(
  key: string,
  stream: Buffer | Readable,
  size: number,
  contentType: string,
): Promise<void> {
  const client = getMinioClient();
  const bucket = process.env.MINIO_BUCKET_NAME;
  if (!bucket) throw new Error('MinIO configuration missing');
  await client.putObject(bucket, key, stream, size, { 'Content-Type': contentType });
}

export async function getPresignedUrl(key: string, ttlSeconds: number): Promise<string> {
  const client = getMinioClient();
  const bucket = process.env.MINIO_BUCKET_NAME;
  if (!bucket) throw new Error('MinIO configuration missing');
  return client.presignedGetObject(bucket, key, ttlSeconds);
}
