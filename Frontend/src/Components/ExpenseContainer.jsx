// import React, { useState } from 'react'
// import "./Styles.css";
// import BalanceContainer from './BalanceContainer';
// function ExpenseContainer() {
//     const [income, setIncome] = useState("");
//     const [title, setTitle] = useState(" ");
//     const [amount, SetAmount] =  useState(0);
//     const [history,setHistory] = useState([]);
//     function handleSubmit(e) {
//     e.preventDefault();
//     if (!title || !amount) return; // ignore empty submissions

//     const newExpense = {
//       title,
//       amount: Number(amount)
//     };

//     setHistory([...history, newExpense]);
//     setTitle("");
//     setAmount("");
//   }
//   return (
//     <div className="expense-container">
//       <div>
//  <BalanceContainer income={Number(income)} history={history} />
//   </div>
//   <h2>Expense Tracker</h2>
  
//         <div>
//          <form method="POST" onSubmit={handleSubmit} className='expense-form'>
//         <input 
//         type='text'className='expense-form-input'
//         placeholder='Enter the title of the expense'
//         value={title}
//         onChange={(e)=>setTitle(e.target.value)}
//         />
//         <input type='number' className='expense-form-input'
//         placeholder='Enter the amount of the expense'
//         value={amount}
//         onChange={(e)=>SetAmount(e.target.value)}
//         />

//         <button> Add Amount </button>
//             </form>
             
//   <div className="expense-list">
//   {history.map((item, index) => (
//     <div 
//       className={`expense-item ${item.amount <= 0 ? "income" : "expense"}`}
//       key={index}
//     >
//       {item.title} — ₹{item.amount}
//     </div>
//   ))}
// </div>

//         </div>
//         </div>
        
//   )
// }

// export default ExpenseContainer


import React, { useState } from 'react';
import "./Styles.css";
import BalanceContainer from './BalanceContaier';

function ExpenseContainer() {
  const [income, setIncome] = useState(""); 
  const [title, setTitle] = useState("");   
  const [amount, setAmount] = useState(""); 
  const [history, setHistory] = useState([]); 

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !amount) return; 

    const newExpense = {
      title,
      amount: Number(amount)
    };

    setHistory([...history, newExpense]);
    setTitle("");
    setAmount("");
  }

  return (
    <div className="expense-container">
      <h2>Expense Tracker</h2>

      <input
        type="number"
        className='expense-form-input'
        placeholder="Enter your total income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />

      <BalanceContainer income={Number(income)} history={history} />

      <form onSubmit={handleSubmit} className='expense-form'>
        <input
          type='text'
          className='expense-form-input'
          placeholder='Enter the title of the expense'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='number'
          className='expense-form-input'
          placeholder='Enter the amount of the expense'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button>Add Expense</button>
      </form>

      <div className="expense-list">
        {history.map((item, index) => (
          <div 
       className={`expense-item ${item.amount <= 0 ? "income" : "expense"}`}
       key={index}
   >
            {item.title} — ₹{item.amount}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseContainer;