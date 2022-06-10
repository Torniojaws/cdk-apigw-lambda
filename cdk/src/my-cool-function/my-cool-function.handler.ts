import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { myCoolImplementation } from './my-cool-implementation';

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  console.log('** Starting My Cool Function lambda');

  const result = await myCoolImplementation();
  
  console.log(`[Lambda: ${context.functionName}, path: ${event.path}]`);
  
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}