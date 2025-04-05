import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: () => {},
  deleteExpense: (id) => {},
  updateExpense: ({ id, description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const newExpense = [action.payload, ...state];
      return newExpense;

    case "SET":
      const inverted = action.payload.reverse;
      return inverted;

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
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
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
    setExpenses,
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
