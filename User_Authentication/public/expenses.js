async function addNewExpense(event) {
  try {
    event.preventDefault();

    const details = {
      expenseamount: document.getElementById("expenseamount").value,
      description: document.getElementById("description").value,
      category: document.getElementById("category").value,
    };

    console.log(details);

    const response = await axios.post("/expense/addexpense", details);

    if (response.status === 201) {
      console.log(response.data);
      addNewExpenseToUI(response.data.expense);
    } else {
      throw new Error("Failed to load ");
    }
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  axios.get("/expense/getexpenses").then((response) => {
    response.data.expenses
      .forEach((expense) => {
        addNewExpenseToUI(expense);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

function addNewExpenseToUI(expense) {
  // const parentElement = document.getElementById("expense-list");
  // const expenseElemId = `expense-${expense.id}`;

  // console.log(expense.expenseamount);
  // console.log(expense.description);
  // console.log(expense.category);

  // parentElement.innerHTML += `<li id=${expenseElemId}>
  // ${expense.expenseamount} - ${expense.description} - ${expense.category}
  // <button onclick='deleteExpense(event , ${expense.id})'>
  //   Delete Expense
  // </button>
  // </li>`;
  const parentElement = document.getElementById("expense-list");
  const childElement = document.createElement("li");

  var dltBtn = document.createElement("button");
  dltBtn.textContent = "delete expense";

  childElement.textContent =
    expense.expenseamount + "-" + expense.description + "-" + expense.category;

  dltBtn.onclick = () => {
    const id = expense.id;
    axios
      .delete(`/expense/deleteexpense/${id}`)
      .then((response) => {
        parentElement.removeChild(childElement);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  childElement.appendChild(dltBtn);
  parentElement.appendChild(childElement);
}

// async function deleteExpense(e, expenseId) {
//   e.preventDefault();
//   // axios
//   //   .delete(`/expense/deleteexpense/${expenseId}`)
//   //   .then((response) => {
//   //     removeExpenseFromUI(expenseId);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });

//   await axios.delete(`/expense/deleteexpense/${expenseId}`);
//   try {
//     removeExpenseFromUI(expenseId);
//   } catch (err) {
//     console.log(err);
//   }
// }

// function removeExpenseFromUI(expenseId) {
//   const expenseElement = `expense -${expenseId}`;
//   document.getElementById(expenseElement).remove();
//   // vari.remove();
// }
