import { useKeyboardNavStore } from '../stores/keyboardNavStore';


const NotFound = () => {
    const enabled = useKeyboardNavStore((s) => s.enabled);
    return (
        <div className="centered">
            <div>
                <h1>Computer Says No</h1>
                <h3>Error Code 404 (page not found)</h3>
                {enabled
                    ? `Press Esc to go back to the previous page`
                    : `Press the back button to go back to the previous page`
                }
            </div>
        </div>
    )
}

export default NotFound