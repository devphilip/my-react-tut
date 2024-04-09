import React from 'react'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import categories from '../categories';


const zodSchema = z.object({
    description: z.string().min(3, { message: "Name must be at least 3 characters" }),
    amount: z.number({ invalid_type_error: "Amount is required" }).min(0.01, { message: "Amount must be at least 1" }).max(100_000, { message: "Amount must be at most 100000" }),
    category: z.enum(categories, {
        errorMap: () => ({ message: "Category is required" }),
    }),    
});


type ExpenseFormData = z.infer<typeof zodSchema>;

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void
}

const ExpenseForm = ({ onSubmit }: ExpenseFormProps) => {

  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<ExpenseFormData>({ resolver: zodResolver(zodSchema) });

  return (
    <form onSubmit={handleSubmit(data => { onSubmit(data); reset(); })}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input {...register("description")} type="text" className="form-control" id="name" />
        {errors.description && <p className="text-danger">{errors.description.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input {...register("amount", { valueAsNumber: true })} type="number" className="form-control" id="amount" />
        {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select {...register("category")} className="form-select" id="category">
          <option value="">All Categories</option>
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
        </select>
        {errors.category && <p className="text-danger">{errors.category.message}</p>}
      </div>
      <button type="submit" className="btn btn-primary">Add Expense</button>
    </form>
  )
}

export default ExpenseForm