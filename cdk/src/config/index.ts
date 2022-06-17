import { StackConfig } from './config.types';

export const apiStack: StackConfig = {
  dev: {
    aws: {
      env: {
        account: '123',
        region: 'eu-west-1'
      }
    },
    env: {
      // If you ever include a domain/URL in the config, remember that http(s):// must be left out!
      // Otherwise calls to external urls will fail with 503 Service Unavailable
      stageName: 'dev'
    }
  },
  staging: {
    aws: {
      env: {
        account: '234',
        region: 'eu-west-1'
      }
    },
    env: {
      stageName: 'staging'
    }
  },
  production: {
    aws: {
      env: {
        account: '345',
        region: 'eu-west-1'
      }
    },
    env: {
      stageName: 'production'
    }
  }
}
