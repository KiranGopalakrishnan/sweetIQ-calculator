(function(){

  var calculatorScreen = document.getElementById('screen');
  calculatorScreen.focus();
  var button = document.getElementsByClassName('button');

  //creating a new calculator object
  var calculator = new Calculator();
  calculator.setDecimalPrecision(2);

  //attaching event listners to all buttons
  for(var i=0;i<button.length;i++){
    button[i].addEventListener('click',handleButtonClick,false);
  }
  document.addEventListener('keydown',handleKeyPress,false);


  //handles the button clicks
  function handleButtonClick(event){
    var clickedButtonValue = event.target.value;
    var currentScreenValue = calculatorScreen.value;
    var result = clickedButtonValue==='='?calculator.calculate(currentScreenValue):addToScreen(currentScreenValue,clickedButtonValue);
    calculatorScreen.value = result;
    calculatorScreen.focus();
  }
  function handleKeyPress(event){
    var pressedKeyChar = String.fromCharCode(event.keyCode);
    var pressedKeyCode = event.keyCode;
    var enterKeyCode = 13;
    var screenValue = calculatorScreen.value
    if(pressedKeyCode === enterKeyCode){
      var result = calculator.calculate(screenValue);
      calculatorScreen.value = result;
      calculatorScreen.focus();
    }
  }
function addToScreen(currentScreenValue,clickedButtonValue){
  return  currentScreenValue+clickedButtonValue;
}

})();
