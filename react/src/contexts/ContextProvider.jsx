import {createContext} from 'react';
import {useState, useContext} from 'react';

const StateContext = createContext({
    user: null,
    token: null,
    setuser: () => {},
    setToken: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({
        name: 'John',
    });
    const [token, _setToken] = useState('');
    // localStorage.getItem('ACCESS_TOKEN')

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
            console.log('removed')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
        
    )
} 

export const useStateContext = () => useContext(StateContext);