import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

export const getSecretFromAws = async (SecretId: string, region: string) => {
  const client = new SecretsManagerClient({ region });
  const command = new GetSecretValueCommand({ SecretId });
  const data = await client.send(command);
  if (data.SecretString) {
    return data.SecretString;
  }
  throw new Error(`Secret not found: ${SecretId}`);
}
