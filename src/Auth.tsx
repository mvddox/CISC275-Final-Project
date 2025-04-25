import { createContext, useContext, useState } from "react";
import { Account } from "./pages/LoginPage";

/*
    Most of this code is from: https://medium.com/@kimtai.developer/react-typescript-authentication-guide-using-context-api-5c82f2530eb1
*/

type LoginInfo = {
    username: string;
    password: string;
}

interface AuthProps {
    isLoggedIn: boolean,
    username: string,
    login (info: LoginInfo): boolean, //will add inputs later for username and password
    logout (): void,
}

const AuthContext = createContext<AuthProps>({
    isLoggedIn: false,
    username: "",
    login: () => false,
    logout: () => {}
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn') ? JSON.parse(localStorage.getItem('isLoggedIn') || 'false' ) : false
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(storedLoginStatus);
    const [ username, setUsername ] = useState<string>('');

    const login = (info: LoginInfo): boolean => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        if (localStorage.getItem(info.username) || ""){
            const account:Account = JSON.parse(localStorage.getItem(info.username) || "");
            if (account.password != null && account.password === info.password){
                setUsername(info.username);
                return true;
            }
        }   
        return false;
    }

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
        setUsername('');
    }

    return (
        <AuthContext.Provider value = {{ isLoggedIn, username, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}