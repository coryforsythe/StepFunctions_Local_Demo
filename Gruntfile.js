module.exports = function(grunt) {
    grunt.initConfig({
    run: {

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
      args:['run','--net=host', '--rm','-e','LAMBDA_ENDPOINT=http://localhost:9001','-e','DYNAMODB_ENDPOINT=http://localhost:8000','amazon/aws-stepfunctions-local']
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
},
'get_hist':{
    options:{
        wait: true
    },
    cmd:'aws',
    args:['stepfunctions','--region','us-east-1','--endpoint','http://localhost:8083', 'get-execution-history','--execution-arn','arn:aws:states:us-east-1:123456789012:execution:test:testRun']
}
}
   
  });
   
  grunt.loadNpmTasks('grunt-run');
   
  grunt.registerTask('test', [
    //Pull latest version of StepFunctions Local and Start it
    'run:stepfunctions_local_pull',
    'run:stepfunctions_local',
    //Create state machine
    'run:create_state_machine',
    //Execute a test
    'run:execute_state_machine',
    'wait:execute_state_machine',
    'run:get_hist'

  ]);
}