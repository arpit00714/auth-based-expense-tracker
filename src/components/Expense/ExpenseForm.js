import { useState } from "react"

const ExpenseForm = ({addExpense}) => {
    const [enteredAmount, setAmount] = useState('')
    const [enteredDesc, setDesc] = useState('')
    const [category, setCategory] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = {
            amount: enteredAmount,
            description: enteredDesc,
            category : category
        }
        addExpense(obj)

    }

    const handleChange = (e) => {
        // console.log(e.target.value)

        if (e.target.name === 'description') setDesc(e.target.value)
        if (e.target.name === 'amount') setAmount(e.target.value)
        if (e.target.name === 'category') setCategory(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className="new-expense">
            <div className="new-expense__controls">

                <div className="new-expense__control">
                    <label htmlFor="amount">Amount </label>
                    <input value={enteredAmount} onChange={handleChange} name="amount" type="number" />
                </div>
                <div className="new-expense__control">
                    <label htmlFor="title">Description </label>
                    <input value={enteredDesc} onChange={handleChange} name="description" type="text" />
                </div>
                <div className="new-expense__control">
                    <label htmlFor="category"> Select Your Category </label>
                    <select value={category} name="category" onChange={handleChange}>
                        <option value="fuel">fuel</option>
                        <option value="food">food</option>
                        <option value="electricity">electricity</option>
                        <option value="movies">movies</option>
                    </select>
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="submit" > Add Expense</button>
            </div>
        </form>
    )
}

export default ExpenseForm;