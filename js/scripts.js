const incomes = [];

const expenses = [];

let loadApp = () => {
  loadHeader();
  loadIncome();
  loadExpense();
};

let totalIncomes = () => {
  let totalIncomes = 0;
  for (let income of incomes) {
    totalIncomes += income.value;
  }
  return totalIncomes;
};

let totalExpenses = () => {
  let totalExpense = 0;
  for (let expense of expenses) {
    totalExpense += expense.value;
  }
  return totalExpense;
};

let loadHeader = () => {
  let budge = totalIncomes() - totalExpenses();
  let expensePercentage = totalExpenses() / totalIncomes();
  document.getElementById("estimate").innerHTML = currencyFormat(budge);
  document.getElementById("percent").innerHTML =
    percentFormat(expensePercentage);
  document.getElementById("income").innerHTML = currencyFormat(totalIncomes());
  document.getElementById("expenses").innerHTML = currencyFormat(
    totalExpenses()
  );
};

const currencyFormat = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimunFractionDigits: 2,
  });
};

const percentFormat = (value) => {
  return value.toLocaleString("en-US", {
    style: "percent",
    minimunFractionDigits: 2,
  });
};

const loadIncome = () => {
  let incomesHTML = "";
  for (let income of incomes) {
    incomesHTML += createIncome(income);
  }
  document.getElementById("income-list").innerHTML = incomesHTML;
};

const createIncome = (income) => {
  const incomeHTML = `
  <div class="element cleanStyle">
    <p class="element-description">${income.description}</p>
    <div class="right cleanStyle">
      <p class="element-value">+ ${currencyFormat(income.value)}</p>
        <div class="element-delete">
          <button class="element-delete--btn">
          <ion-icon name="close-circle-outline" onclick="deleteIncome(${
            income.id
          })"></ion-icon>
          </button>
        </div> 
    </div>
  </div>
  `;
  return incomeHTML;
};

const deleteIncome = (id) => {
  let deleteIndex = incomes.findIndex((income) => income.id === id);
  incomes.splice(deleteIndex, 1);
  loadHeader();
  loadIncome();
};

const loadExpense = () => {
  let expensesHTML = "";
  for (let expense of expenses) {
    expensesHTML += createExpense(expense);
  }
  document.getElementById("expense-list").innerHTML = expensesHTML;
};

const createExpense = (expense) => {
  let expenseHTML = `
  <div class="element cleanStyle">
    <p class="element-description">${expense.description}</p>
    <div class="right cleanStyle">
      <p class="element-value">-${currencyFormat(expense.value)}</p>
      <p class="element-percentage">${percentFormat(
        expense.value / totalExpenses()
      )}</p>
      <div class="element-delete">
        <button class="element-delete--btn">
          <ion-icon name="close-circle-outline"
          onclick="deleteExpense(${expense.id})"></ion-icon>
        </button>
      </div>
    </div>
  </div>
  `;
  return expenseHTML;
};

const deleteExpense = (id) => {
  let deleteIndex = expenses.findIndex((expense) => expense.id === id);
  expenses.splice(deleteIndex, 1);
  loadHeader();
  loadExpense();
};

const addData = () => {
  let forma = document.forms["forma"];
  let description = forma["description"];
  let amount = forma["value"];
  let type = forma["type"];
  if (description.value !== "" && amount.value !== "") {
    if (type.value === "income") {
      incomes.push(new Income(description.value, +amount.value));
      loadHeader();
      loadIncome();
      description.value = "";
      amount.value = "";
    } else if (type.value === "expense") {
      expenses.push(new Expense(description.value, +amount.value));
      loadHeader();
      loadExpense();
      description.value = "";
      amount.value = "";
      type.value = "income";
    }
  }
};
