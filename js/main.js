(function(){
  'use strict';
  var calculatorScreen = document.getElementById("screen");
  var button = document.getElementsByClassName("button");
  var calculator = {
    currentValue:"0",
    calculate:function(){

    }
  };

  for(var i=0;i<button.length;i++){
    button[i].addEventListener('click',handleButtonClick,false);
  }
  //handles the button clicks
  function handleButtonClick(event){
    var clickedButtonValue = event.target.value;
    if(clickedButtonValue==="="){
      calculator.calculate();
    }else{
      // adding to the previous value of the screen textbox
      calculatorScreen.value += clickedButtonValue;
      //refocusing the screen textbox
      calculatorScreen.focus();
    }
  }
})();
