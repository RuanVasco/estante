import { createContext, useState, useContext, useEffect } from "react";
import { api } from "../Services/api";
import { type UserType } from "../Types/UserType";
import parseJwt from "../Services/parseJwt";

type AuthContextType = {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
    user: UserType | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem('token');
            if (!token) return logout();

            try {
                const res = await api.post('/validate');
                if (res.data.valid) {
                    setIsLoggedIn(true);
                    setUser(parseJwt(token));
                } else {
                    logout();
                }
            } catch {
                logout();
            }
        };

        init();
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        setUser(parseJwt(token));
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");
    return context;
};
