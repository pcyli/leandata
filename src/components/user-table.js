import User from "./user";
import './user-table.css'
import Modal from "./modal";
import React, {useState} from "react";

export default function UserTable (props) {
    const { users, addUserHandler, removeUserHandler, editUserHandler } = props;
    const [modalVisibility, setModalVisibility] = useState(false);

    const generateUsers = (users) =>
        users.map((user) => <User
                                data={user}
                                key={user.id}
                                removeUserHandler={removeUserHandler}
                                editUserHandler={editUserHandler} />)

    const addUser = (payload, resolve, reject) => {
        try {
            addUserHandler({...payload, totalExpense: 0});
            resolve();
        } catch (e) {
            reject();
        }
    }

    return (
        <div className={"UserTable"}>
            <header>
                <div>First Name</div>
                <div>Last Name</div>
                <div>Total Expenses</div>
                <div className={"add-item"} onClick={() => setModalVisibility(true)}>Add User</div>
            </header>
            <section>
                {
                    generateUsers(users)
                }
            </section>
            <Modal show={modalVisibility} setModalVisibility={setModalVisibility} handler={addUser} title={"Add User"}>
                <div>
                    <label htmlFor={"firstName"}>First Name</label>
                    <input type={"text"} name={"firstName"} placeholder={"First Name"}/>
                </div>
                <div>
                    <label htmlFor={"lastName"}>Last Name</label>
                    <input type={"text"} name={"lastName"} placeholder={"Last Name"}/>
                </div>
            </Modal>
        </div>
    )
}