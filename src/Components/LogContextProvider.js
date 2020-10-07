import React, {useState, createContext} from 'react';

export const LogContext = createContext();

let value; 
        if(localStorage.getItem('auth-token')){
            value = 1;
        }else { value = 0;}
export const LogContextProvider = (props) => {

    const [log, setLog] = useState(value);

    const loggedIn = () => {
            setLog(1);
            return   
    }
    const notLoggedIn = () => {
        setLog(0);
        return;
    }
    
    return (
        <LogContext.Provider value = {{log: log,
            loggedIn: loggedIn,
            notLoggedIn: notLoggedIn
            }}>
            {props.children}
        </LogContext.Provider>
    )
}