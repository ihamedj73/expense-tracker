import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/ExpensesOutPut/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/ExpensesOutPut/UI/LoadingOverlay";
import ErrorOverlay from "../components/ExpensesOutPut/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const expenseCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === expenseId,
  );

  useLayoutEffect(
    function () {
      navigation.setOptions({
        title: isEditing ? "Edit Expense" : "Add Expense",
      });
    },
    [isEditing, navigation],
  );

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(expenseId);
      expenseCtx.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expenseCtx.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseCtx);
      } else {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (error) {
      setError("'Could not save data - please try again later");
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) return <LoadingOverlay />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        onChancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultExpense={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
