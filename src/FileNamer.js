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

    useEffect(() => {
        const handleWindowClick = () => setAlert(false)
        if(alert) {
            window.addEventListener('click', handleWindowClick)
        } else {
            window.removeEventListener('click', handleWindowClick)
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