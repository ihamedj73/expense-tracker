import { StyleSheet, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummery from "./ExpensesSummery";
import { GlobalStyles } from "../../constants/styles";

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
];

function ExpensesOutPut({ expenses, expensePeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummery
        expenses={DUMMY_EXAMPLES}
        expensePeriod={expensePeriod}
      />
      <ExpensesList expenses={DUMMY_EXAMPLES} />
    </View>
  );
}

export default ExpensesOutPut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
