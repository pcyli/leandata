import Expense from "./expense";
import './expense-table.css'
import Modal from "./modal";
import {useState} from 'react';

const CATEGORY_TYPES = ["Food", "Travel", "Health", "Supplies"];

export default function ExpenseTable (props) {
    const { expenses, users, addExpenseHandler, removeExpenseHandler, editExpenseHandler } = props;
    const [modalVisibility, setModalVisibility] = useState(false);

    const generateFullName = user => `${user.firstName} ${user.lastName}`

    const generateUserDropdown = users =>
        users.map(user => <option value={user.id} key={user.id}>{generateFullName(user)}</option>)

    const generateCategoryDropdown = categories =>
        categories.map(category => <option value={category} key={category}>{category}</option>)

    const generateExpenses = expenses =>
        expenses.map((expense) => {
                const associatedUser = users.find(user => user.id === expense.userid )

                return <Expense fullName={generateFullName(associatedUser)}
                                data={expense}
                                removeExpenseHandler={removeExpenseHandler}
                                editExpenseHandler={editExpenseHandler}
                                users={users}
                                categories={CATEGORY_TYPES}
                                generateFullName={generateFullName}
                                key={expense.id}/>
            }
        )

    const addExpense = (payload, resolve, reject) => {
        try {
            debugger;
            if (isNaN(payload.cost) || payload.cost === '') {
                alert("Entered cost is not a number.");
                reject();
                return;
            } else if (payload.description === '') {
                alert("Description cannot be empty.");
                reject();
                return;
            }
            addExpenseHandler(payload);
            resolve();
        } catch (e) {
            reject();
        }
    }

    return (
        <div className={"ExpenseTable"}>
            <header>
                <div>Full Name</div>
                <div>Category</div>
                <div className={"double-wide"}>Description</div>
                <div className={"justify-right"}>Cost</div>
                <div className={"add-item"} onClick={() => setModalVisibility(true) }>Add Expense</div>
            </header>
            <section>
                {
                    generateExpenses(expenses)
                }
            </section>
            <Modal show={modalVisibility} setModalVisibility={setModalVisibility} handler={addExpense} title={"Add Expense"}>
                <div>
                    <label htmlFor={"userid"}>Full Name: </label>
                    <select name={"userid"}>
                        {
                            generateUserDropdown(users)
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor={"category"}>Category: </label>
                    <select name={"category"}>
                        {
                            generateCategoryDropdown(CATEGORY_TYPES)
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor={"description"}>Description: </label>
                    <input type={"text"} name={"description"} placeholder={"Description"}/>
                </div>
                <div>
                    <label htmlFor={"cost"}>Cost: </label>
                    <input type={"text"} name={"cost"} placeholder={"Cost"}/>
                </div>
            </Modal>
        </div>
    )
}