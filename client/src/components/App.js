import React from "react";
//import { AppContext } from "./context";
import { Navbar, NavbarBrand } from 'reactstrap';
import HomePage from './HomePage';
import { Routes, Route, Link } from "react-router-dom";
import PersonnelDetails from './PersonnelDetails';
 

function App (){
    return(
        <div className="App">
            <Navbar dark color="primary" >
            <div className="container">
                <NavbarBrand href="/">US Army Personnel Registry</NavbarBrand> 
            </div>
           </Navbar>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="personnelDetails" element={<PersonnelDetails />} />
            </Routes>
           
        </div>
    )
}

export default App;