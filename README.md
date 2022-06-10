# cdk-apigw-lambda

Just a note-to-self example CDK implementation using API Gateway and Lambda

## Install from nothing

1. `npm install aws-cdk-lib`
2. `mkdir cdk && cd cdk`
3. `npx cdk init app --language=typescript`

## Synthesize CloudFormation template

1. `cd cdk`
2. `npx cdk synth`
3. Check the contents of `cdk.out/`

## Deploy

Once the code is done, you deploy it to your configured (`~/.aws/config`) AWS
account using the command: 

- `cd cdk`
- `npx cdk deploy --app 'cdk.out/' MyProjectApi-dev`

So if you want to deploy to eg. staging, you would use `MyProjectApi-staging`
That way the App will always deploy to correct place.

## General notes

- An **App** is the full CDK implementation; a full "backend" or "frontend"
- A **Stack** is a CloudFormation yaml file; a "service" in the App
  - A stack is often a combo of 2+ AWS resources, like API Gateway + Lambda
  - or IAM+S3, or WAF+APIGW+Lambda+DynamoDB
  - Construct is a CDK OOP class that just holds similar things together for 
    separation of concerns and has no effect on CloudFormation result.
- A **Construct** is a single AWS service, or a custom one you can create
- There are three levels of constructs:
  - L1 = A "raw AWS service, like s3.CfnBucket() - all such begin with Cfn...
    - You must configure it completely yourself
  - L2 = A more generic service, like s3.Bucket(), which is more opinionated
    - Less configuration needed, but also less control
  - L3 = Very simple setup, like s3deploy.BucketDeployment
    - Very little config needed, but also very little control
    
## AWS team comments

> A stack is just a group of resources. One giant group of resources will
inhibit your ability to tear down resources independently of your other 
resources. Dividing your resources into smaller groups can make it easier to 
manage and roll back/forward changes.

> He recommended always putting your networking and database layer (stateful 
resources) into a base stack. Next, you should put your application (stateless)
resources into one or more stacks. This way you can tear down the app and 
recreate it while leaving up your network and database layer intact.
