import React from 'react'

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface ExpenseProps {
  expenses: Expense[],
  onDeleteExpense: (id: number) => void
}

const ExpenseList = ({ expenses, onDeleteExpense }: ExpenseProps ) => {
  if (expenses.length === 0) {
    return <p>No expenses</p>
  }
  return (
    <table className="table table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td><button className="btn btn-outline-danger" onClick={() => onDeleteExpense(expense.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Total</td>
            <td>${expenses.reduce((acc, expense) => expense.amount + acc, 0).toFixed(2)}</td>
          </tr>
        </tfoot>
    </table>
  )
}

export default ExpenseList