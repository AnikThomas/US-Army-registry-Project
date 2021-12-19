import React from "react";
//import { AppContext } from "./context";
import { Navbar, NavbarBrand } from 'reactstrap';


function App (){
    return(
        <div className="App">
            <Navbar dark color="primary" >
            <div className="container">
                <NavbarBrand href="/">US Army Personnel Registry</NavbarBrand> 
            </div>
           </Navbar>
        </div>
    )
}

export default App;