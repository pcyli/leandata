import CompanyExpense from "./company-expense";
import './company-expenses-table.css';

export default function CompanyExpensesTable (props) {
    const { expenses } = props;

    const generateCompanyExpenses = (expenses) => {
        const sums = {};

        expenses.forEach((expense) => {
            const { category, cost } = expense;

            if (!sums[category]) {
                sums[category] = 0;
            }

            sums[category] += cost;
        })

        return Object.keys(sums).map(
            (category) => <CompanyExpense category={category} totalExpense={sums[category]} key={category}/>
        );
    }

    return (
        <div className={"CompanyExpensesTable"}>
            <header>
                <div>Category</div>
                <div>Total Expense</div>
            </header>
            <section>
                {
                    generateCompanyExpenses(expenses)
                }
            </section>

        </div>
    )
}