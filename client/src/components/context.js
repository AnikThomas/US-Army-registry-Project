import React, { useState, createContext, useEffect } from "react";

const url = 'http://localhost:8000/personnel';
const AppContext = createContext();

const AppProvider = ({ children}) => {
    const [personnels, setPersonnels] = useState([])

    //I need useEffect so the fetch will not run on repeat
            useEffect(() => {
                console.log('fetching');
                fetch(url, {method: "get"})
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        setPersonnels(data.personnels)
                    })
                    .catch((err) => console.log(err));
                return () => {};
            }, []);
    
    return(
        <AppContext.Provider value={{ 
            personnels
           
        }}>
            { children }
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider }