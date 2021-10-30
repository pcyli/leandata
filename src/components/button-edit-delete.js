import './button-edit-delete.css';

export default function ButtonEditDelete (props) {
    const { id, removeHandler, editHandler} = props;

    return (
        <div className={"ButtonEditDelete"}>
            <div onClick={() => editHandler()}>Edit</div>
            <div onClick={() => removeHandler(id)}>Remove</div>
        </div>
    )
}