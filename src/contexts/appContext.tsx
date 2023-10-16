import React, { useState, useContext, useEffect } from "react";

// Interfaces
export interface Object3D {
    glb_s3_path?: string;
    name: string;
    url?: string;
    parts_3d?: Part3D[];
    prompt?: string;
    preview_s3_path?: string;
    part_list?: string;

}

export interface Part3D {
    name: string;
}

type AppContextType = {
    organizationName: string;
    setOrganizationName: React.Dispatch<React.SetStateAction<string>>;
    selectedObject: Object3D | undefined;
    setSelectedObject: React.Dispatch<React.SetStateAction<Object3D | undefined>>;
    available3DObjects: Object3D[] | [];
    setAvailable3DObjects: React.Dispatch<React.SetStateAction<Object3D[]>>;
    clear: CallableFunction;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

// Context Initialization
const AppContext = React.createContext<AppContextType | undefined>(undefined);

function UseAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("UseAppContext must be used within an AppContextProvider");
    }
    return context;
}

const AppContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // Helper function to retrieve data from local storage
    const getFromLocalStorage = (key: string) => {
        const item = localStorage.getItem(key);
        if (!item || item === 'undefined') {
            return null;
        }
        try{        return JSON.parse(item)} catch {return item}

    }

    // State initialization
    const [selectedObject, setSelectedObject] = useState<Object3D | undefined>(getFromLocalStorage('selectedObject'));
    const [available3DObjects, setAvailable3DObjects] = useState<Object3D[]>(getFromLocalStorage('available3DObjects') || []);
    const [organizationName, setOrganizationName] = useState<string>(getFromLocalStorage('organizationName') || "");

    // Effect hook to save state changes to local storage
    useEffect(() => {
        localStorage.setItem('selectedObject', JSON.stringify(selectedObject));
        localStorage.setItem('available3DObjects', JSON.stringify(available3DObjects));
        localStorage.setItem('organizationName', organizationName);
    }, [selectedObject, available3DObjects, organizationName]);

    // Clear state and local storage
    const clear = () => {
        setSelectedObject(undefined);
        setAvailable3DObjects([]);
        setOrganizationName("");
        localStorage.clear();
    }

    return (
        <AppContext.Provider value={{
            selectedObject,
            setSelectedObject,
            available3DObjects,
            setAvailable3DObjects,
            organizationName,
            setOrganizationName,
            clear
        }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContextProvider, UseAppContext };
