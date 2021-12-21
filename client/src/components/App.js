import React from "react";
//import { AppContext } from "./context";
import { Navbar, NavbarBrand } from 'reactstrap';
import HomePage from './HomePage';
import { Routes, Route } from "react-router-dom";
import PersonnelDetails from './PersonnelDetails';
import UpdatePersonnelDetails from './UpdatePersonnelDetails';
 

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
                <Route exact path="personnelDetails" element={<PersonnelDetails />} />
                <Route path="personnelDetails/:id" element={<UpdatePersonnelDetails/>} />
            </Routes>
           
        </div>
    )
}

export default App;