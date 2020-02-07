# StepFunctions_Local_Demo (step functions cicd)
This is a demonstration for using SAM Local, along with StepFunctions local to develop state machines locally.

# Setup

**1: Install the AWS CLI**. 
The AWS CLI is required to invoke the local stepfunctions endpoint.  Install it by [following the instructions here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html)

**2: Install the AWS SAM CLI**. 
The SAM CLI is required to run lambda functions locally during debug. Please follow the [steps to install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

**3: Install Java JDK**. 
Java is leveraged by the local engines supporting stepfunctions. Please follow the instructions to [Install Java](https://www.oracle.com/technetwork/java/javase/downloads/index.html)

**4: Install StepFunctions**   
Install step functions locally from [this link](https://docs.aws.amazon.com/step-functions/latest/dg/sfn-local.html) and then update Gruntfile.js so that ***pathToStepFunctions*** references the unzipped/untarred directory holding the jar files.

**45 Install Node**. 
This example uses Grunt, a task-runner for NodeJs.  As such, please ensure you have followed the instructions to [Install NodeJs](https://nodejs.org/en/download/)

**6: Install Grunt Module**. 
Once Node is installed, use the included NPM utility to install grunt

```
npm install -g grunt
```

**5: Install local modules**. 
From the root directory of this repository, install the npm modules

```
npm install
```

# Running the test. 
To execute the test run the 'test' target of the Grunfile

```
grunt test
```

You will notice that local services start and a stepfunctions execution is started.  If everything works, you should soon see output from the state machine

```...
n\",\n        \"End\": true\n      }\n    }\n  }","roleArn":"arn:aws:iam::123456789012:role/DummyRole","tags":null,"requestCredentials":null,"requestCredentialsProvider":null,"generalProgressListener":{"syncCallSafe":true},"readLimit":131073,"cloneRoot":null}
{
    "stateMachineArn": "arn:aws:states:us-east-1:123456789012:stateMachine:test",
    "creationDate": 1581048248.534
}
2020-02-07 04:04:08.550: [200] CreateStateMachine <= {"sdkResponseMetadata":null,"sdkHttpMetadata":null,"stateMachineArn":"arn:aws:states:us-east-1:123456789012:stateMachine:test","creationDate":1581048248534}

Running "run:execute_state_machine" (run) task
2020-02-07 04:04:08.955: StartExecution => {"requestClientOptions":{"readLimit":131073,"skipAppendUriPath":false},"requestMetricCollector":null,"customRequestHeaders":null,"customQueryParameters":null,"cloneSource":null,"sdkRequestTimeout":null,"sdkClientExecutionTimeout":null,"stateMachineArn":"arn:aws:states:us-east-1:123456789012:stateMachine:test","name":"testRun","input":null,"requestCredentials":null,"requestCredentialsProvider":null,"generalProgressListener":{"syncCallSafe":true},"readLimit":131073,"cloneRoot":null}
2020-02-07 04:04:08.988: [200] StartExecution <= {"sdkResponseMetadata":null,"sdkHttpMetadata":null,"executionArn":"arn:aws:states:us-east-1:123456789012:execution:test:testRun","startDate":1581048248982}
{
    "executionArn": "arn:aws:states:us-east-1:123456789012:execution:test:testRun",
    "startDate": 1581048248.982
}
2020-02-07 04:04:09.006: arn:aws:states:us-east-1:123456789012:execution:test:testRun : {"Type":"ExecutionStarted","PreviousEventId":0,"ExecutionStartedEventDetails":{"Input":"{}","RoleArn":"arn:aws:iam::123456789012:role/DummyRole"}}
2020-02-07 04:04:09.009: arn:aws:states:us-east-1:123456789012:execution:test:testRun : {"Type":"TaskStateEntered","PreviousEventId":0,"StateEnteredEventDetails":{"Name":"CalculateTax","Input":"{}"}}
2020-02-07 04:04:09.020: arn:aws:states:us-east-1:123456789012:execution:test:testRun : {"Type":"LambdaFunctionScheduled","PreviousEventId":2,"LambdaFunctionScheduledEventDetails":{"Resource":"arn:aws:lambda:us-east-1:123456789012:function:CalculateTaxFunction","Input":"{}"}}
2020-02-07 04:04:09.020: arn:aws:states:us-east-1:123456789012:execution:test:testRun : {"Type":"LambdaFunctionStarted","PreviousEventId":3}

Done.
```

# Other considerations  
Some APIs, CLIs, etc., may require that a default AWS region be specified even when using local endpoints. It is advantageous to run 'aws config' to populate dummy credentials and a region.
