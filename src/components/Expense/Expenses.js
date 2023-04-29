import { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import UpdateForm from "./UpdateForm";

function Expenses() {
  // const [expenses, setExpenses] = useState([
  //     {
  //         amount: 200,
  //         description: 'some description',
  //         category: 'dummy category'
  const url =
    "https://ecommerce-website-9cea4-default-rtdb.firebaseio.com/expenses.json";

  const [expenses, setExpenses] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState({});

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

  const getData = (id) => {
    fetch(
      `https://fir-99cf8-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setId(id);
        setData(data);
        setShow((prev) => !prev);
      });
  };

  const addExpense = async (expense) => {
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
      //   setExpenses([...expenses, expense]);
      console.log(data);

      getExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteExpense = (id) => {
    fetch(
      `https://fir-99cf8-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`,
      {
        method: "DELETE",
      }
    ).then(() => {
      console.log("Expense successfuly deleted");
    });
    const filteredExpenses = expenses.filter((expense) => expense.id != id);
    setExpenses(filteredExpenses);
  };

  const editExpense = (expense, id) => {
    fetch(
      `https://fir-99cf8-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(expense),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((data) => {
      console.log(data);
      getExpenses();
    });
  };

  return (
    <>
      {/* <ExpenseForm addExpense={onAdd} /> */}
      {!show ? (
        <ExpenseForm addExpense={addExpense} />
      ) : (
        <UpdateForm edit={editExpense} data={data} setShow={setShow} id={id} />
      )}
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
        {expenses.length > 0 &&
          expenses.map((item) => (
            <article className="expense" key={item.id}>
              <h2>{item.description}</h2>
              <h3>{item.amount}</h3>
              <p>{item.category}</p>
              <div>
                <button className="edit" onClick={() => getData(item.id)}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => deleteExpense(item.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
      </section>
    </>
  );
}

export default Expenses;
