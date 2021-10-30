import React, { useState, useEffect, useRef } from 'react';
import UserTable from "./components/user-table";
import ExpenseTable from "./components/expense-table";
import CompanyExpensesTable from "./components/company-expenses-table";
import "./App.css";

const USER_DATA = [{id: 1, firstName: "Tom", lastName: "Riddle", totalExpense: 1600}];
const EXPENSE_DATA = [
    {id: 1, userid: 1, category: "Supplies", description: "It's a book. Go away", cost: 100},
    {id: 2, userid: 1, category: "Supplies", description: "It's a ring. Go away", cost: 200},
    {id: 3, userid: 1, category: "Supplies", description: "It's a locket. Go away", cost: 300},
    {id: 4, userid: 1, category: "Supplies", description: "It's a cup. Go away", cost: 400},
    {id: 5, userid: 1, category: "Supplies", description: "It's a diadem. Go away", cost: 500},
    {id: 6, userid: 1, category: "Food", description: "An apple.", cost: 100}
]

function App() {
    const [ userTable, setUserTable ] = useState(USER_DATA);
    const [ expenseTable, setExpenseTable ] = useState(EXPENSE_DATA);
    const lastExpenseUserID = useRef([]);

    const generateMaxId = table => {
        let maxID = 0;

        table.forEach(entry => {
            if (entry.id > maxID) {
                maxID = entry.id;
            }
        })

        return maxID + 1;
    }

    const addToUserTable = user => {
        const newUser = {id: generateMaxId(userTable), ...user };

        setUserTable([...userTable, newUser]);
    }

    const editUserTable = user => {
        setUserTable(prevData => {
            const {id} = user;

            const oldIndex = prevData.findIndex(user => user.id === id);
            const clonedTable = prevData.slice();
            clonedTable[oldIndex] = user;

            return clonedTable;
        })
    }

    const removeFromUserTable = id => {
        setUserTable(userTable.filter(user => user.id !== id));
        setExpenseTable(expenseTable.filter(expense => expense.userid !== id));
    }

    const addToExpenseTable = (expense) => {
        const newExpense = {id: generateMaxId(expenseTable), ...expense };

        lastExpenseUserID.current = [expense.userid];
        setExpenseTable([...expenseTable, newExpense]);
    }

    const editExpenseTable = expense => {
        const { id } = expense;

        const oldIndex = expenseTable.findIndex(expenseItem => expenseItem.id === id);
        const clonedTable = expenseTable.slice();
        clonedTable[oldIndex] = expense;

        lastExpenseUserID.current = [expense.userid, expenseTable[oldIndex].userid];

        setExpenseTable(clonedTable);
    }

    const removeFromExpenseTable = id => {
        setExpenseTable(expenseTable.filter(expense => expense.id !== id));
    }

    useEffect(() => {
        const ids = lastExpenseUserID.current;

        ids.forEach(id => {
            const totalExpenses = expenseTable
                .filter(expense => expense.userid === id)
                .reduce((total, expense) => expense.cost + total, 0);
            const user = userTable.find(user => user.id === id);
            const userClone = {...user, totalExpense: totalExpenses};

            editUserTable(userClone);
        });

    }, [expenseTable]);

    return (
        <div className="App">
            <UserTable users={userTable}
                       addUserHandler={addToUserTable}
                       editUserHandler={editUserTable}
                       removeUserHandler={removeFromUserTable}
                       key="UserTable"/>
            <ExpenseTable users={userTable}
                          expenses={expenseTable}
                          addExpenseHandler={addToExpenseTable}
                          editExpenseHandler={editExpenseTable}
                          removeExpenseHandler={removeFromExpenseTable}
                          key="ExpenseTable"/>
            <CompanyExpensesTable expenses={expenseTable} />
        </div>
    );
}

export default App;
