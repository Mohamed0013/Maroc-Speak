import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user : null,
    token : null,
    course : null,
    notification : null,
    setUser : () => {},
    setToken : () => {},
    setCourse : () => {},
    setNotification : () => {}
}) 

export const ContextProvider = ({children}) => {  

    const [user, setUser] = useState({});
    const [sidebar, setSidebar] = useState(false);
    const [course, setCourse] = useState({});
    const [category, setCategory] = useState({});
    const [notification, _setNotification] = useState('')
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    // const [token, _setToken] = useState(123)
    const setToken = (token) =>{
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN',token);
        } else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setNotification = (message) =>{
        _setNotification(message)
        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }

    const toggleSide = () =>{
        setSidebar(!sidebar);
    }

    return(
        <StateContext.Provider value={{
            user,
            token,
            course,
            category,
            setUser,
            setToken,
            setCourse,
            setCategory,
            notification,
            setNotification,
            sidebar,
            toggleSide
        }}>
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext)