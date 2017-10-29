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
    var separators = ['\\\(', '\\\)'];
    var opArray = opString.split(new RegExp(separators.join('|'), 'g'));
    console.log(opArray);
    //we start from right
    /*for(var i=opArray.length-1;i>0;i--){
      if(opArray[i]==='('){
        //bracketOpenIndex.push(i);
        //console.log(opArray[i]);
        for(var j=i;j<opArray.length;j++){

          //console.log("--------");
          //console.log(opArray[j]);
          if(opArray[j]===')'){
            var single_operation = opArray.splice(i,j);//.join("");
            console.log(single_operation);
            break;
            //single_operation = single_operation.replace(/\(/g,"").replace(/\)/g,"");
        }
        }
      }
    }
    bracketOpenIndex.sort(function(a,b){
      return b-a;
    })*/
    /*
    for(var i=0;i<bracketOpenIndex.length;i++){
console.log(bracketOpenIndex[i]);
      for(var j=bracketOpenIndex[i];j<opArray.length;j++){

    console.log(j);

          if(opArray[j]===')'){
            var single_operation = opArray.splice(i,(j+1));//.join("");
            console.log(single_operation);
            //single_operation = single_operation.replace(/\(/g,"").replace(/\)/g,"");
        }
      }
    }*/
    response = bracketOpenIndex.length === 0 ? response : "Error";
    return response;
  }
})();
