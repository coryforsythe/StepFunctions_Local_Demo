const pathToStepFunctions="/Users/cforsyth/code/StepFunctionsLocal";
const inputObj={sales:500};

module.exports = function(grunt) {
    grunt.initConfig({
    run: {
   //Pulls the latest stepfunctions local
   lambda_local:{
    options:{
        wait: false
    },
    cmd:'sam',
    args:['local','start-lambda','--region','us-east-1','-p','9001']
},
    //Starts stepfunctions on port 8083 (deletes the container when done)
    stepfunctions_local:{
      options:{
          wait: false
      },
      cmd:'java',
      args:['-classpath',pathToStepFunctions,'-jar',pathToStepFunctions+'/StepFunctionsLocal.jar','-lambdaEndpoint','http://localhost:9001']
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
    args:['stepfunctions','--region','us-east-1','--endpoint','http://localhost:8083', 'start-execution','--state-machine','arn:aws:states:us-east-1:123456789012:stateMachine:test','--name','testRun','--input',JSON.stringify(inputObj)]
},
'get_hist':{
    options:{
        wait: true
    },
    exec:'status=$(aws stepfunctions --region us-east-1 --endpoint http://localhost:8083 describe-execution --execution-arn arn:aws:states:us-east-1:123456789012:execution:test:testRun | jq -r .status); echo "";echo "$status"; while [ "$status" == "RUNNING" ]; do status=$(aws stepfunctions --region us-east-1 --endpoint http://localhost:8083 describe-execution --execution-arn arn:aws:states:us-east-1:123456789012:execution:test:testRun | jq -r .status) && echo "..." && sleep 3; done'
}
}
   
  });
   
  grunt.loadNpmTasks('grunt-run');
   
  grunt.registerTask('test', [
    //Start lambda
    'run:lambda_local',
    //Ask java to setup StepFunctions Local and Start it
    'run:stepfunctions_local',
    //Create state machine
    'run:create_state_machine',
    //Execute a test
    'run:execute_state_machine',
    'wait:execute_state_machine',
    'run:get_hist'

  ]);
}