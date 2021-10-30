import './company-expense.css';

export default function CompanyExpense (props) {
    const { category, totalExpense } = props;

    return (
        <div className={"CompanyExpense"}>
            <div>{category}</div>
            <div>{totalExpense}</div>
        </div>
    )
}
