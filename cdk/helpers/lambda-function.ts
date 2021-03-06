import * as path from 'path';
import { Duration } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { LambdaEnvironment, LambdaConfig } from './lambda.types';

export const createLambdaFunction = (
  scope: Construct,
  functionName: string,
  environment?: LambdaEnvironment,
  config?: LambdaConfig
) => {
  const defaultHandlerPath = path.resolve(__dirname, `../src/${functionName}/${functionName}.handler.ts`);
  const defaultTimeout = Duration.minutes(5);
  const defaultMemorySize = 256;
  
  return new NodejsFunction(scope, `${functionName}-handler`, {
    functionName,
    runtime: Runtime.NODEJS_14_X,
    memorySize: config?.memorySize || defaultMemorySize,
    entry: config?.handlerPath || defaultHandlerPath,
    environment,
    timeout: config?.timeout || defaultTimeout,
    bundling: {
      minify: false,
      externalModules: ['aws-sdk'],
      sourceMap: true
    }
  });
}