import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { myCoolImplementation } from './my-cool-implementation';
import { getSecretFromAws } from '../../helpers/secrets';

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  console.log('** Starting My Cool Function lambda');

  // If you need to access a secret, such as an x-api-key, you would fetch it here
  const apiKeyRaw = await getSecretFromAws('secret-key-name', process.env.AWS_REGION!);
  // The value is a stringified JSON
  const apiKey: string = JSON.parse(apiKeyRaw).KEYNAME_YOU_USE_IN_SECRETSMANAGER;

  console.log(`[Lambda: ${context.functionName}, path: ${event.path}], apiKey: ${apiKey}`);

  const result = await myCoolImplementation();
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}