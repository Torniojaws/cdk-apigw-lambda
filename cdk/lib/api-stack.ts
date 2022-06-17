import { Duration, Stack, StackProps, aws_secretsmanager } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { createLambdaFunction } from '../helpers/lambda-function';
import { LambdaConfig, LambdaEnvironment } from '../helpers/lambda.types';

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps, environment?: LambdaEnvironment) {
    super(scope, id, props);

    const lambdaConfig: LambdaConfig = {
      memorySize: 128,
      timeout: Duration.minutes(2)
    }

    // Create a Lambda integration to be used in API Gateway
    const lambda = createLambdaFunction(this, 'my-cool-function', environment, lambdaConfig);
    const myCoolLambdaIntegration = new LambdaIntegration(lambda);
    
    // Give the Lambda access to Secret Manager entry 'secret-key-name'
    const myCoolSecret = aws_secretsmanager.Secret.fromSecretNameV2(this, 'My secret', 'secret-key-name')
    myCoolSecret.grantRead(lambda);
    
    // Instantiate the API Gateway
    const api = new RestApi(this, 'My Cool API', {
      restApiName: id,
      description: 'My cool API',
      deploy: true,
      deployOptions: {
        stageName: environment?.stageName
      }
    });
    
    // Create the API endpoints and associate a Lambda to them
    const coolEndpoint = api.root.addResource('coolness'); // Add endpoint /coolness
    coolEndpoint.addMethod('GET', myCoolLambdaIntegration); // Associate a lambda to GET /coolness

    // To add a sub-path, just add a resource + method to the "parent"
    // const subPath = coolEndpoint.addResource('subpath'); // Add endpoint /coolness/subpath
    // subpath.addMethod('POST', addSomethingLambdaFn); // Assoc a lambda to POST /coolness/subpath
    
    // To handle a path parameter, curly braces are used:
    // const paramPath = coolEndpoint.addResource('{id}'); // Add endpoint /coolness/:id
    // paramPath.addMethod('GET', getSpecificItemLambda); // Fetch by id, eg. GET /coolness/123
    // where :id is accessible in the handler using: const id = event.pathParameters.id || '0';
  }
}
