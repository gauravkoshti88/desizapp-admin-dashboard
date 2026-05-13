import { Children, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    let serverUrl = import.meta.env.VITE_API_URL;
    let value = {
        serverUrl,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}