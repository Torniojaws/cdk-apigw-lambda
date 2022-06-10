import * as cdk from 'aws-cdk-lib';
import { ApiStack } from '../lib/api-stack';
import * as config from '../src/config';

const app = new cdk.App();

new ApiStack(app, 'MyProjectApi-dev', config.apiStack.dev);
new ApiStack(app, 'MyProjectApi-staging', config.apiStack.staging);
new ApiStack(app, 'MyProjectApi-prod', config.apiStack.production);