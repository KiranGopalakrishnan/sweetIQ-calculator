//Not enclosing in a ASIF because the main.js requires the caclulator object
'use strict';
//Stack implemented as a constructor function
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

/*
*For adding new functionality
*addthe operation and method to opFunctions
*and add the operator to opList
*/

function Calculator() {
  this.opList=["*","/","+","-"];
  //Characters allowed on the calculator
  this.allowedCharacters=["0","1","2","3","4","5","6","7","8","9",".","(",")"].concat(this.opList);
  this.decimalPrecision = 2; //5 after the decimal point
  this.setDecimalPrecision = function(value){
    this.decimalPrecision = value;
  }
  this.getDecimalPrecision = function(){
    return this.decimalPrecision
  }
  this.getAllowedCharacters = function(){
    return this.allowedCharacters;
  }
  this.opFunctions=[
    //Same presidence operators are grouped together
    {
      '*': function(a, b){ return a * b},
      '/': function(a, b){ return a / b}
    },
    {
      '+': function(a, b){ return a + b},
      '-': function(a, b){ return a - b}
    }
  ];
}
//Calculates and returns the entire operation result
Calculator.prototype.calculate = function(string){
  var stack = new Stack();

  console.log("check p 1");
  ///checks if all bracjet opening and closing have been matched
  var error = this.checkError(string);
  let result = "Error";
  console.log("check p 1");
  if(!error){
    var generatedOpStack = this.generateOpStack(string,stack);

    console.log("check p 2");
    result = this.calculateStackItems(generatedOpStack);

    console.log("check p 3");
  }
  result = failChecks(result);

  console.log("check p 4");
  result = applyDecimalPrecision(this.getDecimalPrecision(),result);

  console.log("check p 5");
  return result;
}

Calculator.prototype.generateOpStack = function(string,stackObj){
  var stack = stackObj;
  var array = string.split("");
  let selfe = this;
  array.forEach(function(item){
    if(item === ')'){
      //Closing bracket found
      //Iterate back until we find a matching opening bracket
      var tempArray=[];
      var nextItem= stack.pop();

      while(nextItem !== '('){
        //keep popping items out of stack until the matching opening bracket is found
        tempArray.push(nextItem);
        nextItem= stack.pop();
      }
      //reverseing the array to ensure operation order is kept as the original string
      var bracketString = tempArray.reverse().join("");
      var parsedOperationArray = selfe.parseOperationString(bracketString);
      var clearedOperationArray = clearArray(parsedOperationArray);
      var output = selfe.performOperations(clearedOperationArray);

      //console.log(output);
      var result = output;
      stack.push(result);
    }else{
      stack.push(item);
    }
  });
  //returning the filled stack
  //console.log(stack.stack);
  return stack;
}
/*
* Calculates the stack items result based on precedence
*/
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
/*
* Takes a array with parsed arguments and operators as an input
* calculates the result of all operations in the given array based on OpPresidence
*/
Calculator.prototype.performOperations= function(array){
  //getting the operation functions from the calculator object
  var opList = this.opFunctions;
  var newArray = [];
  var currentOperator;
  for (var i = 0; i < opList.length; i++) {
    //iterating through the opList and calculating based on precedence
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
    return 'Error';
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
        //beginning of a signed integer
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
    //Number
    calculation.push(parseFloat(current));
  }
  return calculation;
}
//Clearing out the empty values from an array
function clearArray(array){
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] !== undefined && array[i] !== null && array[i] !== "") {
      newArray.push(array[i]);
    }
  }
  return newArray;
}
/*
* Checks for math operational errors in the string
*/
Calculator.prototype.checkError = function(string){
  var response = false;
  var stringArray = string.split("");
  var openBracketsCount=0,closedBracketCount=0;
  stringArray.forEach(function(item,index){
    if(item ==='('){
      openBracketsCount++;
    }
    if(item === ')'&&openBracketsCount>0){
      closedBracketCount++;
    }
  });
  //checking if the open brakcet count matc closed bracket closedBracketCount
  //to determine if all brackets have been closed before processing the string
  response = (openBracketsCount===closedBracketCount?false:true);
  return response;
}
// checks for all possible non numeric responses
// and if true returns 'Error'
function failChecks(value){
var result=value;
  if(value!==value||value===undefined||value===null||value===""||value===Infinity){
    result='Error';
  }
  return result;
}
function applyDecimalPrecision(precision,result){
  var response = (result!=='Error'?parseFloat(result.toFixed(precision)):result);
  return response;
}
