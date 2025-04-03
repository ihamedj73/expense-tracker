import { createContext, useReducer } from "react";

const DUMMY_EXAMPLES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of TROUSERS",
    amount: 89.99,
    date: new Date("2022-01-19"),
  },
  {
    id: "e3",
    description: "some bananas",
    amount: 5.99,
    date: new Date("2022-11-19"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 15.99,
    date: new Date("2022-02-12"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 10.99,
    date: new Date("2022-02-13"),
  },
  {
    id: "e6",
    description: "A pen",
    amount: 15.99,
    date: new Date("2025-04-1"),
  },
  {
    id: "e7",
    description: "food",
    amount: 10.99,
    date: new Date("2025-03-31"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: ({ id, description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      const newExpense = [{ ...action.payload, id }, ...state];

      return newExpense;

    case "UPDATE":
      const updateAbleExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      const updateAbleExpense = state[updateAbleExpenseIndex];
      const updateItem = { ...updateAbleExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateAbleExpenseIndex] = updateItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpenseContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXAMPLES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({
      type: "UPDATE",
      payload: {
        id: id,
        data: expenseData,
      },
    });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpenseContextProvider;
