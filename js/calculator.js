
"use strict";

//Stack implemetation
function Stack(){
  var stack=[];
  this.push = function(item){
    stack.push(item);
  }
  this.size = function(){
    return stack.length;
  }
  this.pop = function(){
    return stack.pop();
  }
}

/*
*For adding new functionality
*add the operation and method to opFunctions
*and add the operator to opList
*/
function Calculator() {
  //options set to default
  var opList=["*","/","+","-"];
  //default Characters allowed on the calculator
  var allowedCharacters=["0","1","2","3","4","5","6","7","8","9",".","(",")"].concat(opList);
  var decimalPrecision = 2; //2 after the decimal point
  var opFunctions=[
    //Same presidence operators are grouped together
    {
      "*": function(a, b){ return a * b},
      "/": function(a, b){ return a / b}
    },
    {
      "+": function(a, b){ return a + b},
      "-": function(a, b){ return a - b}
    }
  ];
  /* Getters and Setters for the private vars*/
  this.setDecimalPrecision = function(value){
    this.decimalPrecision = value;
  }
  this.getDecimalPrecision = function(){
    return decimalPrecision;
  }
  this.setAllowedCharacters = function(array){
    allowedCharacters=array;
  }
  this.getAllowedCharacters = function(){
    return allowedCharacters;
  }
  this.setOpList=function(array){
    opList = array;
  }
  this.getOpList=function(){
    return opList;
  }
  this.setOpFunctions=function(array){
    opFunctions = array;
  }
  this.getOpFunctions=function(){
    return opFunctions;
  }
}
//Calculates and returns the entire operation result
Calculator.prototype.calculate = function(string){
  var stack = new Stack();
  var error = this.preErrorChecks(string);
  //Block level scope for result
  let result = "Error";
  if(!error){
    var generatedOpStack = this.generateOpStack(string,stack);
    result = this.calculateStackItems(generatedOpStack);
  }
  result = this.postErrorChecks(result);
  result = this.applyDecimalPrecision(this.getDecimalPrecision(),result);
  return result;
}

Calculator.prototype.generateOpStack = function(string,stackObj){
  var selfe = this;
  var stack = stackObj;
  var array = string.split("");

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
      var opList = selfe.getOpList();
      var opFunctions = selfe.getOpFunctions();
      var result = selfe.parseAndCalculate(bracketString,opList,opFunctions);
      stack.push(result);

    }else{
      stack.push(item);
    }

  });
  //returning the filled stack
  return stack;
}
/*
* Calculates the stack items result based on precedence
*/
Calculator.prototype.calculateStackItems= function(stack){
  let response = null;
  let currentStack = stack;
  let tempArray = [];
  var stackSize = stack.size();

  //emptying the stack
  while(stackSize>0){
    tempArray.push(currentStack.pop());
    stackSize = stack.size();
  }

  //joining the stack items together for parsing
  //reversing so that we keep the left to right order
  var stackOpString = tempArray.reverse().join("");
  var opList = this.getOpList();
  var opFunctions = this.getOpFunctions();
  response = this.parseAndCalculate(stackOpString,opList,opFunctions);

  return response;
}


//Parses the provided operation string into floats and operands
Calculator.prototype.parseOperationString = function(opString,opList) {
  let response = [];
  var current = '';
  var string = opString;
  //join the op list for determining operator positions from opString
  var operationsList = opList.join("");

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
          response.push(parseFloat(current), ch);
          current = '';
        }else{
          //operator
          response.push(current,ch);
        }
      }
    } else {
      //No operators
      current += string.charAt(i);
    }
  }
  if (current !== '') {
    //Number
    response.push(parseFloat(current));
  }

  return response;
}

/*
* Takes a array with parsed arguments and operators as an input
* calculates the result of all operations in the given array based on OpPresidence
*/
Calculator.prototype.performOperations= function(array,opFunctions){
  let response=null;
  //getting the operation functions from the calculator object
  var opList = opFunctions;
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

  response = array.length > 1?'Error':array[0];
  return response;
}

//Clearing out the empty values from an array
Calculator.prototype.deleteEmptyItems=function(array){
  let response = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] !== undefined && array[i] !== null && array[i] !== "") {
      response.push(array[i]);
    }
  }
  return response;
}
/*
*Parses the recived string and calculates the result by performing
*the passed opFunctions if they are present in the string
*/
Calculator.prototype.parseAndCalculate=function(bracketString,opList,opFunctions){
  let response;
  var parsedOperationArray = this.parseOperationString(bracketString,opList);
  var clearedOperationArray = this.deleteEmptyItems(parsedOperationArray);
  response = this.performOperations(clearedOperationArray,opFunctions);
  return response;
}

/*
* Checks for math operational errors in the string before calculation begins
*/
Calculator.prototype.preErrorChecks = function(string){
  let response = false;
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
Calculator.prototype.postErrorChecks=function(value){
let result=value;
  if(value!==value||value===undefined||value===null||value===""||value===Infinity){
    result='Error';
  }
  return result;
}

Calculator.prototype.applyDecimalPrecision=function(precision,result){
  return (result!=='Error'?parseFloat(result.toFixed(precision)):result);
}
