import ButtonEditDelete from "./button-edit-delete";
import './expense.css';
import Modal from "./modal";
import React, {useState} from "react";

export default function Expense(props) {
    const {
        data: {id, category, description, cost},
        fullName, removeExpenseHandler, editExpenseHandler,
        users, categories, generateFullName
    } = props;

    const [modalVisibility, setModalVisibility] = useState(false);

    const generateUserDropdown = users =>
        users.map(catalogUser => <option
            value={catalogUser.id}
            key={catalogUser.id}>
            {generateFullName(catalogUser)}
        </option>)

    const generateCategoryDropdown = categories =>
        categories.map(catalogCategory => <option value={catalogCategory}
                                                  key={catalogCategory}>
            {catalogCategory}
        </option>)

    const editHandler = (payload, resolve, reject) => {
        try {
            editExpenseHandler(payload);
            resolve();
        } catch (e) {
            reject();
        }
    }

    return (
        <div className={'Expense'}>
            <div>{fullName}</div>
            <div>{category}</div>
            <div className={"double-wide"}>{description}</div>
            <div>{cost}</div>
            <ButtonEditDelete removeHandler={() => removeExpenseHandler(id)}
                              editHandler={() => setModalVisibility(true)}/>
            <Modal show={modalVisibility} setModalVisibility={setModalVisibility} handler={editHandler} title={"Edit Expense"}>
                <input type={"text"} name={"id"} hidden readOnly={true} value={id}/>
                <div>
                    <label htmlFor={"userid"}>Full Name:</label>
                    <select name={"userid"} defaultValue={id}>
                        {
                            generateUserDropdown(users)
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor={"category"}>Category:</label>
                    <select name={"category"} defaultValue={category}>
                        {
                            generateCategoryDropdown(categories)
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor={"description"}>Description:</label>
                    <input type={"text"} name={"description"} placeholder={"Description"} defaultValue={description}/>
                </div>
                <div>
                    <label htmlFor={"cost"}>Cost:</label>
                    <input type={"text"} name={"cost"} placeholder={"Cost"} defaultValue={cost}/>
                </div>
            </Modal>
        </div>
    )
}