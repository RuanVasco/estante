import { createContext, useState, useContext, useEffect } from "react";
import { api } from "../Services/api";

type AuthContextType = {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                logout();
                return;
            }

            const { valid } = await validateToken();
            if (!valid) {
                logout();
                return;
            }

            login(token);
        };

        checkToken(); 
    }, []);

    const validateToken = async () => {
        try {
            const res = await api.post('/validate');
            return { valid: res.data.valid };
        } catch (err) {
            return { valid: false };
        }
    };

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");
    return context;
};
