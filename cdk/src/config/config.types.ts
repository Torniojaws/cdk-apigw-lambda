import { LambdaEnvironment } from '../../helpers/lambda.types';
import { StackProps } from 'aws-cdk-lib';

interface StageConfig {
  aws: StackProps,
  env: LambdaEnvironment
}

export interface StackConfig {
  dev: StageConfig
  staging: StageConfig
  production: StageConfig
}