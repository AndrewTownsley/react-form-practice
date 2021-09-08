import React, { useState, useEffect } from 'react';


const FileNamer = () => {
    const [name, setName] = useState('');
    const [alert, setAlert] = useState(false);

    const validate = (e) => {
        if(/\*/.test(name)) {
            e.preventDefault();
            setAlert(true);
            return;
        }
        setAlert(false)
    }

    // When the alert state changes, add or remove the alert state to add or remove the popup for the input validation.  If the alert state is "true", add the event listener.  If the alert state is "false", remove the event listener.  These event listeners are added and removed dynamically to ensure that this useEffect hook does not run too many times.  This is a concern because the component may render multiple times, and it is unnecessary to run the useEffect hook every time.

    useEffect(() => {
        const handleWindowClick = () => setAlert(false)
        if(alert) {
            window.addEventListener('click', handleWindowClick)
            window.addEventListener('keydown', handleWindowClick)
        } else {
            window.removeEventListener('click', handleWindowClick)
            window.removeEventListener('keydown', handleWindowClick)
        }
        return () => window.removeEventListener('click', handleWindowClick)
    }, [alert, setAlert])

    return (
        <div className="file-namer">
            <div className="preview">Preview: {name}.js</div>
            <form action="submit">
                <label >
                    <p>Name: </p>
                    <input 
                        autoComplete="off" 
                        name="name" 
                        type="text" 
                        onChange={(e) => setName(e.target.value)} 
                        />
                </label>
            </form>
            <div className="information-wrapper">
                <button 
                    className="information" 
                    onClick={() => setAlert(true)}
                    type="button"
                >
                    more information
                </button>
                {alert && 
                <div className="popup">
                    <span role="img" aria-label="allowed"></span>Alphanumeric Characters
                    <br/>
                    <span role="img" aria-label="not allowed"></span> *
                </div>}
            </div>
            <div>
                <button onClick={validate}>Save</button>
            </div>
        </div>
    )
}

export default FileNamer;