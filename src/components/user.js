import ButtonEditDelete from "./button-edit-delete";
import './user.css';
import React, {useState} from "react";
import Modal from "./modal";

export default function User (props) {
   const { data: { id, firstName, lastName, totalExpense }, removeUserHandler, editUserHandler } = props;

   const [modalVisibility, setModalVisibility] = useState(false);

    const editHandler = (payload, resolve, reject) => {
        try {
            if (payload.firstName === '' || payload.lastName === '' ) {
                alert('Both First and Last Names cannot be empty.');
                reject();
                return;
            }
            editUserHandler(payload);
            resolve();
        } catch (e) {
            reject();
        }
    }

   return (
       <div className={'User'}>
           <div>{firstName}</div>
           <div>{lastName}</div>
           <input type="text" disabled aria-disabled={true} value={totalExpense} />
           <ButtonEditDelete id={id} removeHandler={removeUserHandler} editHandler={() => setModalVisibility(true)}/>
           <Modal show={modalVisibility} setModalVisibility={setModalVisibility} handler={editHandler} title={"Edit User"}>
               <input type={"text"} name={"id"} readOnly={true} hidden value={id}/>
                <div>
                    <label htmlFor={"firstName"}>First Name:</label>
                    <input type={"text"} name={"firstName"} placeholder={"First Name"} defaultValue={firstName}/>
                </div>
                <div>
                    <label htmlFor={"lastName"}>Last Name:</label>
                    <input type={"text"} name={"lastName"} placeholder={"Last Name"} defaultValue={lastName}/>
                </div>
           </Modal>
       </div>
   )
}