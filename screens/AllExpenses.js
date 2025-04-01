import { useContext } from "react";
import ExpensesOutPut from "../components/ExpensesOutPut/ExpensesOutPut";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutPut
      expensePeriod={"total"}
      expenses={expensesCtx.expenses}
      fallBackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;
