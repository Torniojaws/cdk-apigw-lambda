import { Duration } from 'aws-cdk-lib';

// Env variables. Each key can be accessed by the Lambda handler using: process.env.VAR_NAME
export interface LambdaEnvironment {
  [key: string]: string
}

// Configure the creation of the Lambda
export interface LambdaConfig {
  handlerPath?: string
  memorySize?: number
  timeout?: Duration
}
