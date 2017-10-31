var calculator = new Calculator();
QUnit.test( "Random Calculation 1", function( assert ) {
  assert.strictEqual(calculator.calculate("5+(4-2)"),7,"Passed!" );
});
QUnit.test( "Random Calculation 2", function( assert ) {
  assert.strictEqual(calculator.calculate("5+(4-2-(5-(6*2)/(5+1)))"),eval("5+(4-2-(5-6*2/(5+1)))"),"Passed!" );
});
QUnit.test( "Random Calculation 3", function( assert ) {
  assert.strictEqual(calculator.calculate("5+(4-2)"),7,"Passed!" );
});
QUnit.test( "Random Calculation 4", function( assert ) {
  assert.strictEqual(calculator.calculate("5.45611+(4.344-2.3-(5-6.5*2/(5+1.000009)))"),parseFloat(eval("5.45611+(4.344-2.3-(5-6.5*2/(5+1.000009)))").toFixed(2)),"Passed!" );
});
/* Error Cases*/
QUnit.test( "Error case #1", function( assert ) {
  assert.strictEqual(calculator.calculate("5.45611+((4.344-2.3-(5-6.5*2/(5+1.000009)))"),"Error","Passed!" );
});
QUnit.test( "Error case #2", function( assert ) {
  assert.strictEqual(calculator.calculate("5+(4-2)+a"),"Error","Passed!" );
});

QUnit.test( "Error case #3", function( assert ) {
  assert.strictEqual(calculator.calculate("--*()"),"Error","Passed!" );
});

QUnit.test( "Error case #3", function( assert ) {
  assert.strictEqual(calculator.calculate("5--*(6)"),'Error',"Passed!" );
});

/* DIVIDED by ZERO*/

QUnit.test( "Error case #3", function( assert ) {
  assert.strictEqual(calculator.calculate("5/0"),'Error',"Passed!" );
});

/*BASIC OP*/
QUnit.test( "Addition", function( assert ) {
  assert.strictEqual(calculator.calculate("5+34.5"),39.5,"Passed!" );
});

QUnit.test( "Subtraction", function( assert ) {
  assert.strictEqual(calculator.calculate("5-34.3"),parseFloat(eval("5-34.3").toFixed(2)),"Passed!" );
});

QUnit.test( "Multiplication", function( assert ) {
  assert.strictEqual(calculator.calculate("3.2*1.8"),5.76,"Passed!" );
});

QUnit.test( "Divion", function( assert ) {
  assert.strictEqual(calculator.calculate("5/30"),parseFloat(eval("5/30").toFixed(2)),"Passed!" );
});
