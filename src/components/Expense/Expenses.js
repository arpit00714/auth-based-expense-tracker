import { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";

function Expenses() {
  // const [expenses, setExpenses] = useState([
  //     {
  //         amount: 200,
  //         description: 'some description',
  //         category: 'dummy category'
  const url =
    "https://ecommerce-website-9cea4-default-rtdb.firebaseio.com/expenses.json";

  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const arr = [];
        for (const key in data) {
          arr.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          });
        }
        setExpenses(arr);
      });
  };

  const onAdd = async (expense) => {
    const options = {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // const onAdd = (expense) => {
      //     setExpenses([...expenses, expense])
      //     console.log(expense, expenses)
      const res = await fetch(url, options);
      const data = await res.json();
      // getExpenses()
      setExpenses([...expenses, expense]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ExpenseForm addExpense={onAdd} />
      <h1
        style={{
          textTransform: "uppercase",
          textAlign: "center",
          color: "cornflowerblue",
        }}
      >
        Your Expenses
      </h1>
      <section className="expenses">
        {expenses.map((item) => (
          <article className="expense" key={item.description}>
            <h2>{item.description}</h2>
            <h3>{item.amount}</h3>
            <p>{item.category}</p>
          </article>
        ))}
      </section>
    </>
  );
}

export default Expenses;
