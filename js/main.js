(function(){
  window.onload=function(){
    var calculatorScreen = document.getElementById('screen');
    var button = document.getElementsByClassName('button');

    //creating a new calculator object
    var calculator = new Calculator();

    //attaching event listners to all buttons
    for(var i=0;i<button.length;i++){
      button[i].addEventListener('click',handleButtonClick,false);
    }
    document.addEventListener('keypress',handleKeyPress,false);


    //handles the button clicks
    function handleButtonClick(event){
      var clickedButtonValue = event.target.value;
      var currentScreenValue = calculatorScreen.value;
      var result = clickedButtonValue==='='?calculator.calculate(currentScreenValue):addToScreen(currentScreenValue,clickedButtonValue);
      calculatorScreen.value = result;
      calculatorScreen.focus();
    }
    function handleKeyPress(event){
      var pressedKey = e.target.key;
      alert(pressedKey);
      var allowedCharacters = calculator.getAllowedCharacters();
      var joinedAllowedChars = allowedCharacters.join("");
      //if(joinedAllowedChars.indexOf())

    }

  }
})();
