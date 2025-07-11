import { createContext, useState, useContext, useEffect } from "react";
import { api } from "../Services/api";
import { type UserType } from "../Types/UserType";
import parseJwt from "../Services/parseJwt";
import type { JwtPayload } from "../Types/JwtPayloadType";

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

    const defineUser = (token: string) => {
        const payload = parseJwt(token) as JwtPayload;
        const userObj: UserType = {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
        };

        setUser(userObj);
    }

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem('token');
            if (!token) return logout();

            try {
                const res = await api.post('/validate');
                if (!res.data.valid) return logout();

                setIsLoggedIn(true);
                defineUser(token);
            } catch {
                logout();
            }
        };

        init();
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        defineUser(token);
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
