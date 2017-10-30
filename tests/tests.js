var calculator = new Calculator();
QUnit.test( "calculate1", function( assert ) {
  assert.strictEqual(calculator.calculate("5+(4-2)"),7,"Passed!" );
});
QUnit.test( "calculate2", function( assert ) {
  assert.strictEqual(calculator.calculate("5+(4-2-(5-6*2/(5+1)))"),eval("5+(4-2-(5-6*2/(5+1)))"),"Passed!" );
});
QUnit.test( "calculate3", function( assert ) {
  assert.strictEqual(calculator.calculate("5+(4-2)"),7,"Passed!" );
});
QUnit.test( "calculate4", function( assert ) {
  assert.strictEqual(calculator.calculate("5.45611+(4.344-2.3-(5-6.5*2/(5+1.000009)))"),eval("5.45611+(4.344-2.3-(5-6.5*2/(5+1.000009)))"),"Passed!" );
});
