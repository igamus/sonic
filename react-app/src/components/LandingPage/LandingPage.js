import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";


const LandingPage =( ) => {
    return(
        <>
        <div>
            Welcome
        </div>
        <NavLink exact to="/login">Loginpage temporary</NavLink>
        <div>
        <NavLink exact to="/me">Servers emporaryp</NavLink>
        </div>
        </>
    )
}
export default LandingPage
