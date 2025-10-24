import { useKeyboardNavStore } from '../stores/keyboardNavStore';

const Error = () => {
    const enabled = useKeyboardNavStore((s) => s.enabled);
    return (
        <div className="centered">
            <div>
                <h1>Something Went Wrong</h1>
                <h3>This is probably not your fault - if the error persists please try again later.</h3>
                {enabled
                    ? `Press Esc to go back to the previous page`
                    : `Press the back button to go back to the previous page`
                }
            </div>
        </div>
    )
}

export default Error