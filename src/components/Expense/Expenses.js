import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import UpdateForm from "./UpdateForm";
import { expensesActions } from "../../store/expenses";
import { themeActions } from "../../store/theme";

function Expenses() {
  // const [expenses, setExpenses] = useState([
  //     {
  //         amount: 200,
  //         description: 'some description',
  //         category: 'dummy category'
  const url =
    "https://ecommerce-website-9cea4-default-rtdb.firebaseio.com/expenses.json";

  // const [expenses, setExpenses] = useState([]);
  const expenses = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    getExpenses();
    downloadFile();
  }, []);

  let amount = 0;
  expenses.forEach((expense) => {
    amount += Number(expense.amount);
  });

  // useEffect(() => {
  //   getExpenses();
  // }, []);

  const downloadFile = () => {
    let csvText = "";

    expenses.forEach((expense, index) => {
      if (!index) {
        return (csvText += `${["AMOUNT", "DESCRIPTION", "CATEGORY"].join(
          ","
        )}\r\n`);
      }

      const properValues = [
        expense.amount,
        expense.description,
        expense.category,
      ];
      return (csvText += `${properValues.join(",")}\r\n`);
    });
    const a = document.getElementById("download-file");
    const blob = new Blob([csvText]);
    a.href = URL.createObjectURL(blob);
  };

  const setDarkMode = () => {
    dispatch(themeActions.darkMode());
  };

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
        // setExpenses(arr);
        dispatch(expensesActions.setExpenses(arr));
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
    // setExpenses(filteredExpenses);
    dispatch(expensesActions.setExpenses(filteredExpenses));
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
          //   }}
          // >
          //   Your Expenses
          //   {amount > 1000 ? <button className="btn">Activate Premium</button> : ""}
          // </h1>
        }}
      >
        Your Expenses{" "}
      </h1>

      <div
        style={{
          textAlign: "center",
          margin: "1rem",
        }}
      >
        <a id="download-file" download={"file.csv"}>
          {" "}
          Download File
        </a>
        {amount > 1000 && (
          <button onClick={setDarkMode}>Activate Premium</button>
        )}
      </div>
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
