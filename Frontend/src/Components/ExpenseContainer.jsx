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


import React, { useState, useEffect } from "react";
import "./Styles.css";
import BalanceContainer from "./BalanceContaier";

function ExpenseContainer() {
  const [income, setIncome] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchExpenses() {
      const res = await fetch("http://localhost:5000/expenses");
      const data = await res.json();
      setHistory(data);
    }
    fetchExpenses();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !amount) return;

    const newExpense = { title, amount: Number(amount) };

    const res = await fetch("http://localhost:5000/add-expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense),
    });

    if (res.ok) {
      // Re-fetch the updated list
      const updated = await fetch("http://localhost:5000/expenses");
      const data = await updated.json();
      setHistory(data);
    }

    setTitle("");
    setAmount("");
  }

  async function deleteExpense(id) {
    await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    });

    const res = await fetch("http://localhost:5000/expenses");
    const data = await res.json();
    setHistory(data);
  }

  return (
    <div className="expense-container">
      <h2>Expense Tracker</h2>

      <input
        type="number"
        className="expense-form-input"
        placeholder="Enter your total income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />

      <BalanceContainer income={Number(income)} history={history} />

      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          className="expense-form-input"
          placeholder="Enter the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          className="expense-form-input"
          placeholder="Enter the amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button>Add Expense</button>
      </form>

      <div className="expense-list">
        {history.map((item) => (
          <div
            className={`expense-item ${
              item.amount <= 0 ? "income" : "expense"
            }`}
            key={item._id}
          >
            {item.title} — ₹{item.amount}
            <button
              className="delete-btn"
              onClick={() => deleteExpense(item._id)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseContainer;
