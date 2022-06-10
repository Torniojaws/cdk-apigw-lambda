import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { createLambdaFunction } from '../helpers/lambda-function';

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create a Lambda integration to be used in API Gateway
    const myCoolLambdaFn = new LambdaIntegration(
      createLambdaFunction(this, 'my-cool-function')
    );
    
    // Instantiate the API Gateway
    const api = new RestApi(this, 'My Cool API', {
      restApiName: id,
      description: 'My cool API',
      deploy: true
    });
    
    // Create the API endpoints and associate a Lambda to them
    const coolEndpoint = api.root.addResource('coolness'); // Add endpoint /coolness
    coolEndpoint.addMethod('GET', myCoolLambdaFn); // Associate a lambda to GET /coolness

    // To add a sub-path, just add a resource + method to the "parent"
    // const subPath = coolEndpoint.addResource('subpath'); // Add endpoint /coolness/subpath
    // subpath.addMethod('POST', addSomethingLambdaFn); // Assoc a lambda to POST /coolness/subpath
  }
}
