import { createContext, useContext, useState } from "react";

interface AuthProps {
    isLoggedIn: boolean,
    login (): void, //will add inputs later for username and password
    logout (): void,
}

const AuthContext = createContext<AuthProps>({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn') ? JSON.parse(localStorage.getItem('isLoggedIn') || 'false' ) : false
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(storedLoginStatus);

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    }

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
    }

    return (
        <AuthContext.Provider value = {{ isLoggedIn, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}