 import React, { useState, useContext} from "react";
import { Object3D } from "./appContext";

 type UserValue = {
    user: {},
    organization: {
        name: string
    },
    objects_3d : Array<Object3D>
    
}

type AuthContextType = {
    value: Partial<UserValue>
    setValue: React.Dispatch<React.SetStateAction<Partial<UserValue>>>;
}

interface AuthProviderProps {
    children: React.ReactNode;
}



const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [value, setValue] = useState<Partial<UserValue>>({});
  
    return (
        <AuthContext.Provider value={{ value, setValue }}>
            {children}
        </AuthContext.Provider>
    );
};

// Exporting AuthProvider so you can use it in your main App component or wherever you need it.
export { AuthProvider };