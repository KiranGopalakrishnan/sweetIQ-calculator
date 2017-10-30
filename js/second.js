(function(){

  'use strict';

  function Stack(){
    this.stack=[];
    this.push = function(item){
      this.stack.push(item);
    }
    this.size = function(){
      return this.stack.length;
    }
    this.pop = function(){
      return this.stack.pop();
    }
    this.peek = function(){
      return this.stack[this.stack.length-1];
    }
  }

  var calculator = {
      calculate:function(screenString){
        var calcString = screenString;
        var operationOrderArray = [];
        var calcStringArray = calcString.split('(');
      },
    opList:["*","/","+","-"],
    opFunctions:[
      //Same presidence operators are grouped together in left to right order
      {
        '*': function(a, b){ return a * b},
       '/': function(a, b){ return a / b}
     },
      {
        '+': function(a, b){ return a + b},
         '-': function(a, b){ return a - b}
      }
    ]
  };

  var calculatorScreen = document.getElementById('screen');
  var button = document.getElementsByClassName('button');

  for(var i=0;i<button.length;i++){
    button[i].addEventListener('click',handleButtonClick,false);
  }

  //handles the button clicks
  function handleButtonClick(event){
    var clickedButtonValue = event.target.value;
    var currentScreenValue = calculatorScreen.value;
    var result = clickedButtonValue==='='?generateopListtack(currentScreenValue):addToScreen(currentScreenValue,clickedButtonValue);
    //generateopListtack(currentScreenValue);
    //Setting the result to screen
    calculatorScreen.value = result;
    calculatorScreen.focus();
  }
  function generateopListtack(string){
    var stack = new Stack();
    var array = string.split("");
    var tempArray = [];
    array.forEach(function(item){
      if(item === ')'){
        var tempArray=[];
        var nextItem= stack.pop();
        //console.log(nextItem);
        while(nextItem !== '('){
          tempArray.push(nextItem);
          nextItem= stack.pop();
        }
        //reverse the array because we are going backwords in the while loop
      var bracketString = tempArray.reverse().join("");
      var parsedOperationArray = parseOperationString(bracketString);
      var clearedOperationArray = clearArray(parsedOperationArray);

      console.log(clearedOperationArray);

      var output = performOperations(clearedOperationArray);

      console.log(output);
      var result = output;
      stack.push(result);
      }else{
        stack.push(item);
      }
    });
    //console.log(output);
    var output = calculateStack(stack);

  }
  var addToScreen = function(currentScreenValue,clickedButtonValue){
    return currentScreenValue+clickedButtonValue;
  }
  function calculateStack(stack){
    let currentStack = stack;
    let tempArray = [];
    var stackSize = stack.size();
    //emptying the stack
    while(stackSize>0){
      tempArray.push(currentStack.pop());
      stackSize = stack.size();
    }
    //joining the stack items together for parsing
    var stackOpString = tempArray.reverse().join("");
    var parsedOperationArray = parseOperationString(stackOpString);
    var finalOutput = performOperations(parsedOperationArray);
    console.log("FINAL");
    console.log(finalOutput);
  }
  function performOperations(array){
    //getting the operation functions from the calculator object
    var opList = calculator.opFunctions,
        newArray = [],
        currentOperator;
    for (var i = 0; i < opList.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (opList[i][array[j]]) {
                currentOperator = opList[i][array[j]];
            } else if (currentOperator) {
                newArray[newArray.length - 1] =
                    currentOperator(newArray[newArray.length - 1], array[j]);
                currentOperator = null;
            } else {
                newArray.push(array[j]);
            }
        }
        //assigning back to the array
        array = newArray;
        newArray = [];
    }
    if (array.length > 1) {
        console.log('Error :(');
        return array;
    } else {
        return array[0];
    }
  }

  //Parses the provided operation string into floats and operands
  function parseOperationString(opString) {
    var calculation = [],
        current = '',
        string = opString;
        //join the op list for determining operator positions from opString
        var operationsList = calculator.opList.join("");
    for (var i = 0, ch; ch = string.charAt(i); i++) {
      //find the indexes of al the operators present in the opString
      var operaterPosition = operationsList.indexOf(ch);
        if ( operaterPosition > -1) {
            if (current == '' && ch == '-') {
                current = '-';
            } else {
              if(current !== ''){
                //number
                calculation.push(parseFloat(current), ch);
                current = '';
              }else{
                //operator
                calculation.push(current,ch);
              }
            }
        } else {
            //No operators
            current += string.charAt(i);
        }
    }
    if (current !== '') {
        calculation.push(parseFloat(current));
    }
    return calculation;
}
  //Clearing out the empty values from the array
  function clearArray(array){
    var newArray = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] !== undefined && array[i] !== null && array[i] !== "") {
      newArray.push(array[i]);
    }
   }
   return newArray;
  }
})();
