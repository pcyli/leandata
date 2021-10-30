import './modal.css';

export default function Modal (props) {
    const { title, children, handler, show, setModalVisibility } = props;

    const confirmHandler = () => {
        const fields = document.querySelectorAll('.Modal input, .Modal select, .Modal textarea');
        const payload = {}

        for (const element of fields) {
            if (element.value !== '' && !isNaN(element.value)) {
                payload[element.name] = parseFloat(element.value);
            } else {
                payload[element.name] = element.value;
            }
        }

        const confirmationPromise = new Promise((resolve, reject) => {
            handler(payload, resolve, reject);
        })

        confirmationPromise.then(() => setModalVisibility(false), () => {})
    }

    if (show) {
        return (
            <div className={"Modal"}>
                <div className={"ModalContent"}>
                    <header>
                        {
                            title
                        }
                    </header>
                    <section>
                        {
                            children
                        }
                    </section>
                    <footer>
                        <div onClick={() => confirmHandler()}>OK</div>
                        <div onClick={() => setModalVisibility(false)}>Cancel</div>
                    </footer>
                </div>
            </div>
        );
    } else {
        return null;
    }
}