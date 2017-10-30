(function(){
  window.onload=function(){
    var calculatorScreen = document.getElementById('screen');
    var button = document.getElementsByClassName('button');

    for(var i=0;i<button.length;i++){
      button[i].addEventListener('click',handleButtonClick,false);
    }

    //handles the button clic1ks
    function handleButtonClick(event){
      var clickedButtonValue = event.target.value;
      var currentScreenValue = calculatorScreen.value;
      //creating a new calculator object
      var calculator = new Calculator();
      var result = clickedButtonValue==='='?calculator.calculate(currentScreenValue):addToScreen(currentScreenValue,clickedButtonValue);
      calculatorScreen.value = result;
      calculatorScreen.focus();
    }
  }
})();
