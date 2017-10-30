(function(){

  'use strict';

  var calculator = {
    calculate:function(screenString){
      var calcString = screenString;
      var operationOrderArray = [];
      var calcStringArray = calcString.split('(');
      this.generateOpStack(calcStringArray);
    },
    operationsList:"*/+-"
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
    var result = clickedButtonValue==='='?generateOpStack(currentScreenValue):addToScreen(currentScreenValue,clickedButtonValue);
    //Setting the result to screen
    calculatorScreen.value = result;
    calculatorScreen.focus();
  }

  var addToScreen = function(currentScreenValue,clickedButtonValue){
    return currentScreenValue+clickedButtonValue;
  }

  function generateOpStack(opString){
    var response = opString;
    var depthArray = retrieveDepths(opString);
    console.log("depth array");
    console.log(depthArray);
    var sortedDepthArray = sortBasedOnDepth(depthArray);
    /*sortedDepthArray.forEach(function(item){
      var parsedOperationArray = parseOperationString(item.token);
      var clearedOperationArray = clearArray(parsedOperationArray);
      var output = performOperation(clearedOperationArray);
      console.log("output");
      console.log(parsedOperationArray);
    });*/
    return response;
  }
  function performOperation(array,prevResult=""){
    var response="";
    response += prevResult;
    console.log("res");
    console.log(response);
    if(array.length>=3){
      var singleOpArray = array.splice(0,3);
      var a = singleOpArray[0],b = singleOpArray[1],c = singleOpArray[2];
      response += singleOperation(a,b,c);
    }else{
      response = response+array.join("");
      return response;
    }
    //recursion
    performOperation(array,response);
  }
  function singleOperation(a,operand,b){
    a = a*1.0;
    b= b*1.0;
    var response=0;
    if()
        response = add(a,b);
        break;
      case "-":
      response = subtract(a,b);
      break;
      case "*":
      response = multiply(a,b);
      break;
      case "/":
      response = divide(a,b);
      break;
    }
    return response;
  }
  function add(a,b){
    return a+b;
  }
  function subtract(a,b){
    return a-b;
  }
  function multiply(a,b){
    return a*b;
  }
  function divide(a,b){
    return a/b;
  }
  function retrieveDepths(opString){
    var tokens = opString.split(/([()])/), result = [], depth = 0;
    tokens.forEach(function scan(token){
      if(!token) return;
      if(token === "(") {
        depth++;
        return;
      }
      if(token === ")") {
        depth--;
        return;
      }
      result.push({depth: depth, token: token});

    });
    return result;
  }
  //Sorts the array based on depth
  function sortBasedOnDepth(array){
    //sorting DESC
    return array.sort(function(a,b){
      return b.depth-a.depth;
    });
  }
  //Parses the provided operation string into floats and operands
  function parseOperationString(opString) {
    var calculation = [],
        current = '',
        string = opString;
        var operationsList = calculator.operationsList;
    for (var i = 0, ch; ch = string.charAt(i); i++) {
      var operaterPosition = operationsList.indexOf(ch);
        if ( operaterPosition > -1) {
            if (current == '' && ch == '-') {
                current = '-';
            } else {
              if(current != ''){
                calculation.push(parseFloat(current), ch);
                current = '';
              }else{
                calculation.push(current,ch);
              }
            }
        } else {
            current += string.charAt(i);
        }
    }
    if (current != '') {
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
