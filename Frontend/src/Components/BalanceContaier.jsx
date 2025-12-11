// import React from 'react'
// function BalanceContainer({ ExpensesData }) {
//   let income = 0;
//   let expense = 0;

//   ExpensesData.forEach((item) => {
//     if (item.amount >= 0) income += item.amount;
//     else expense += Math.abs(item.amount);
//   });

//   const balance = income - expense;
//   return (
//     <div>
//      <h2>Amount Chart</h2>
//      <div>
//     <div className="balance-container">
//       <div className="balance-box">
//         <div className='income'>
//         <h3>Income</h3>
//         <h3>₹{income}</h3>
//       </div>
//     </div>
//       <div className="balance-box">
//         <div className='expense'>
//         <h3>Expense</h3>
//         <h3>₹{expense}</h3>
//       </div>
//       </div>

//       <div className="balance-box">
//         <div className='balance-con'>
//         <h3>Balance</h3>
//         <h3>₹{balance}</h3>
//       </div>
//     </div>
//     </div>
//         </div>
//     </div>
//   )
// }

// export default BalanceContainer


import React from 'react';

function BalanceContainer({ income, history }) {
    let totalExpenses = 0;
    for (let i = 0; i < history.length; i++) {
    totalExpenses += history[i].amount;
  }
  const balance = income - totalExpenses;

  return (
    <div className="balance-container">
      <div className="balance-box income">
        <h3>Income</h3>
        <h3>₹{income}</h3>
      </div>

      <div className="balance-box expense">
        <h3>Expenses</h3>
        <h3>₹{totalExpenses}</h3>
      </div>

      <div className="balance-box balance-con">
        <h3>Balance</h3>
        <h3>₹{balance}</h3>
      </div>
    </div>
  );
}

export default BalanceContainer;

