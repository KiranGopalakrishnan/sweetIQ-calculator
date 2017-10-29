(function(){

  'use strict';
var Stack = {
  stack:[],
  pointer:0,
  push:function(item){
    stack.push(item);
    this.pointer++;
  },
  pop:function(){
    stack.slice(this.pointer-1,this.pointer);
    this.pointer--;
  },
  peek:function(){
    return stack[pointer];
  }
}
  var calculator = {
    calculate:function(screenString){
      var calcString = screenString;
      var operationOrderArray = [];
      var calcStringArray = calcString.split('(');
      this.generateOpStack(calcStringArray);
    }
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
    var opArray = opString.split('');
    var bracketOpenIndex = [];
    var bracketClosedIndex = [];
    for(var i=0;i<opArray.length;i++){
      if(opArray[i]==='('){
        bracketOpenIndex.push(i)
      }
    }
    console.log(opArray);
    //Reversing the array to match with the closed bracket indexes
   bracketOpenIndex.reverse();
    console.log(bracketOpenIndex);
    console.log(bracketClosedIndex);
    response = bracketOpenIndex.length === bracketOpenIndex.length ? response : "Error";
    for(var i=0;i<opArray.length;i++){
      var single_operation = opArray.splice(bracketOpenIndex[i],bracketClosedIndex[(i+1)]).join("");
      //single_operation = single_operation.replace(/\(/g,"").replace(/\)/g,"");
      //console.log(single_operation);
    }
    //console.log(opArray);
    return response;
  }
})();
