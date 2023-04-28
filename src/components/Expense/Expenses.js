import { useState } from "react"
import ExpenseForm from "./ExpenseForm"


function Expenses() {

    const [expenses, setExpenses] = useState([
        {
            amount: 200,
            description: 'some description',
            category: 'dummy category'
        }
    ])

    const onAdd = (expense) => {
        setExpenses([...expenses, expense])
        console.log(expense, expenses)
    }

    return (
        <>
            <ExpenseForm addExpense={onAdd} />
            <h1 style={{
                textTransform: 'uppercase',
                textAlign: 'center',
                color: 'cornflowerblue',
            }}>Your Expenses</h1>
            <section className="expenses">

                {
                    expenses.map(item => (
                        <article className="expense" key={item.description}>
                            <h2>{item.description}</h2>
                            <h3>{item.amount}</h3>
                            <p>{item.category}</p>
                        </article>
                    ))
                }
            </section>

        </>
    )
}

export default Expenses;