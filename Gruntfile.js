module.exports = function(grunt) {
    grunt.initConfig({
    run: {
    
      //Starts the SAM Local CLI to host the contained template.yaml function
      lambda_local: {
        options: {
            wait:false
        },
        cmd: 'sam',
        args:['local','start-lambda','--region','us-east-1']
      },
      //Pulls the latest ddb local
      ddb_local_pull:{
          options:{
              wait: true
          },
          cmd:'docker',
          args:['pull','amazon/dynamodb-local']
      },
    //Starts DDB Local on port 8000 (deletes the container when done)
    ddb_local:{
        options:{
            wait: false,
            ready:/Initializing\sDynamoDB/
        },
        cmd:'docker',
        args:['run','--rm','-p','8000:8000','amazon/dynamodb-local']
    },
    //Pulls the latest stepfunctions local
    stepfunctions_local_pull:{
        options:{
            wait: true
        },
        cmd:'docker',
        args:['pull','amazon/aws-stepfunctions-local']
    },
    //Starts stepfunctions on port 8083 (deletes the container when done)
    stepfunctions_local:{
      options:{
          wait: false,
          ready:/Starting\sserver/
      },
      cmd:'docker',
      args:['run','--rm','-p','8083:8083','-e','LAMBDA_ENDPOINT=http://localhost:3001','-e','DYNAMODB_ENDPOINT=http://localhost:8000','amazon/aws-stepfunctions-local']
  },
  //Create the state machine based on statemachine.json
  create_state_machine:{
    options:{
        wait: true
    },
    cmd:'aws',
    args:['stepfunctions','--region','us-east-1','--endpoint','http://localhost:8083', 'create-state-machine','--name','test','--role','arn:aws:iam::123456789012:role/DummyRole','--definition','file://statemachine.json']
},
//Execution of the state machine (just a demo, no input in this example)
'execute_state_machine':{
    options:{
        wait: true
    },
    cmd:'aws',
    args:['stepfunctions','--region','us-east-1','--endpoint','http://localhost:8083', 'start-execution','--state-machine','arn:aws:states:us-east-1:123456789012:stateMachine:test','--name','testRun']
}
}
   
  });
   
  grunt.loadNpmTasks('grunt-run');
   
  grunt.registerTask('test', [
    //Start local lambda function based on ./CalculateTax
    'run:lambda_local',
    //Pull latest version of DDB Local and Start it (used for example)
    'run:ddb_local_pull',
    'run:ddb_local',
    //Pull latest version of StepFunctions Local and Start it
    'run:stepfunctions_local_pull',
    'run:stepfunctions_local',
    //Create state machine
    'run:create_state_machine',
    //Execute a test
    'run:execute_state_machine'
  ]);
}