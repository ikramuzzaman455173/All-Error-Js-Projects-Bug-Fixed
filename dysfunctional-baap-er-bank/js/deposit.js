// DRY ---> Do Not Repeat Yourself
document.getElementById("btn-deposit").addEventListener("click", function () {
  /*
    1. get the element by id
    2. get the value from the element
    3. convert string value to a number
    */
  const newDepositAmount = getInputFieldValueById("deposit-field");
  if (newDepositAmount < 0 || isNaN(newDepositAmount)) {
    alert('Please Enter A Valid Amount !')
    return
  }
  const previousDepositTotal = getTextElementValueById("deposit-total");
  // calculate new deposit total
  const newDepositTotal = previousDepositTotal + newDepositAmount;
  // get previous balance by using the function
  const previousBalanceTotal = getTextElementValueById("balance-total");
  const newBalanceTotal = previousBalanceTotal + newDepositAmount;
  // set deposit total value
  setTextElementValueById("deposit-total", newDepositTotal);
  setTextElementValueById("balance-total", newBalanceTotal);
  inputFieldValueEmpity("deposit-field")
});
