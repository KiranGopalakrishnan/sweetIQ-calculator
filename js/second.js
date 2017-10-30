(function(){
  /*
  *TODO : Disable use strict in production code
  */
  'use strict';
  //STACK implemented as a constructor function
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
  }

  function Calculator() {
    this.opList=["*","/","+","-"],
    this.opFunctions=[
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
  }

  var calculatorScreen = document.getElementById('screen');
  var button = document.getElementsByClassName('button');

  for(var i=0;i<button.length;i++){
    button[i].addEventListener('click',handleButtonClick,false);
  }

  //handles the button clic1ks
  function handleButtonClick(event){
    var clickedButtonValue = event.target.value;
    var currentScreenValue = calculatorScreen.value;
    var calculator = new Calculator();
    var result = clickedButtonValue==='='?calculator.calculate(currentScreenValue):addToScreen(currentScreenValue,clickedButtonValue);
    calculatorScreen.value = result;
    calculatorScreen.focus();
  }

  Calculator.prototype.calculate = function(string){
      var stack = new Stack();
      var generatedOpStack = this.generateOpStack(string,stack);
      var calculatedOutput = this.calculateStackItems(generatedOpStack);
      console.log(calculatedOutput);
      return calculatedOutput;
    }

  Calculator.prototype.generateOpStack = function(string,stackObj){
    var stack = stackObj;
    var array = string.split("");
    var tempArray = [];
    let selfe = this;
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
      var parsedOperationArray = selfe.parseOperationString(bracketString);
      var clearedOperationArray = selfe.clearArray(parsedOperationArray);

      //console.log(clearedOperationArray);

      var output = selfe.performOperations(clearedOperationArray);

      //console.log(output);
      var result = output;
      stack.push(result);
      }else{
        stack.push(item);
      }
    });
    //returning the filled stack

    console.log(stack.stack);
    return stack;
  }
  var addToScreen = function(currentScreenValue,clickedButtonValue){
    return currentScreenValue+clickedButtonValue;
  }
  Calculator.prototype.calculateStackItems= function(stack){
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
    var parsedOperationArray = this.parseOperationString(stackOpString);
    var output = this.performOperations(parsedOperationArray);
    return output;
  }
  Calculator.prototype.performOperations= function(array){
    //getting the operation functions from the calculator object
    var opList = this.opFunctions;
    var newArray = [];
    var currentOperator;
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
  Calculator.prototype.parseOperationString = function(opString) {
    var calculation = [];
    var current = '';
    var string = opString;
        //join the op list for determining operator positions from opString
        var operationsList = this.opList.join("");
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
  Calculator.prototype.clearArray =  function(array){
    var newArray = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] !== undefined && array[i] !== null && array[i] !== "") {
      newArray.push(array[i]);
    }
   }
   return newArray;
  }

})();
