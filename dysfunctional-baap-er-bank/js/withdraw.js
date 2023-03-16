/*
1. add withdraw button event handler
2. get withdraw amount by using getInputFieldValueById function
3. get previous withdraw amount by using getTextElementValueById function
4. calculate new withdraw Total and set the value
4-5: set new withdraw total by using setTextElementValueById function
5. get previous balance total by using getTextElementValueById function
6. calculate new balance total
7. set balance total using setTextElementValueById
*/

document.getElementById("btn-withdraw").addEventListener("click", function () {
  const newWithdrawAmount = getInputFieldValueById("withdraw-field");
  if (newWithdrawAmount < 0 || isNaN(newWithdrawAmount)) {
    alert('Please Enter A Valid Amount !')
    return
  }
  const previousWithdrawTotal = getTextElementValueById("withdraw-total");
  const previousBalanceTotal = getTextElementValueById("balance-total");
  if (newWithdrawAmount > previousBalanceTotal) {
    alert('Withdraw Is Not Much More Than Balance !')
    return
  }
  const newWithdrawTotal = previousWithdrawTotal + newWithdrawAmount;
  const newBalanceTotal = previousBalanceTotal - newWithdrawAmount;
  // Set Text Element All
  setTextElementValueById("withdraw-total", newWithdrawTotal);
  setTextElementValueById("balance-total", newBalanceTotal);
  inputFieldValueEmpity("withdraw-field")
});
