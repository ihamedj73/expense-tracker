import { useContext } from "react";
import ExpensesOutPut from "../components/ExpensesOutPut/ExpensesOutPut";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
    // return expense.date >= date7DaysAgo;
  });
  return (
    <ExpensesOutPut
      expensePeriod="Last 7 days"
      expenses={recentExpenses}
      fallBackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
