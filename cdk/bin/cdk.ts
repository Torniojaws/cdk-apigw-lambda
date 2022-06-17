import * as cdk from 'aws-cdk-lib';
import { ApiStack } from '../lib/api-stack';
import * as config from '../src/config';

const app = new cdk.App();

new ApiStack(app, 'MyProjectApi-dev', config.apiStack.dev.aws, config.apiStack.dev.env);
new ApiStack(app, 'MyProjectApi-staging', config.apiStack.staging.aws, config.apiStack.staging.env);
new ApiStack(app, 'MyProjectApi-prod', config.apiStack.production.aws, config.apiStack.production.env);