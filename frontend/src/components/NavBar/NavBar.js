import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
// import FoxBay from '../../assets/images/FoxBay.jpeg';

function NavBar() {
    const [loggedIn, setLoggedIn] = useState(true);

  return (
    <>
      <div className="navBar">
        <div className="navBarTitle" >
          {<h1>GreenBay</h1>}
        </div>
        <div className="navBarMenu">
            <Link to="/" style={{ textDecoration: 'none' }} ><div>Home</div></Link>
            <Link to="/shop" style={{ textDecoration: 'none' }} ><div>Shop</div></Link>
        </div>
        <div className="navBarLogos">
            {loggedIn && (
            <div>
                <Link to="/" style={{ textDecoration: 'none' }} ><i className="fas fa-shopping-cart" /></Link>
                <Link to="/" style={{ textDecoration: 'none' }} ><i className="fas fa-plus-circle" /></Link>
                <Link to="/" style={{ textDecoration: 'none' }} ><i class="fas fa-user-circle" /></Link>  
            </div>
            )}
        </div>
        <div className="navBarUserMenu" >
            {!loggedIn && (
            <div className="navBarUserMenuVisitor">
                <Link to="/login" style={{ textDecoration: 'none' }} ><div>Login</div></Link>
                <Link to="/register" style={{ textDecoration: 'none' }} ><div>Sign up</div></Link>
            </div>
            )}
            {loggedIn && (
            <div className="navBarUserMenuCustomer">
                <Link to="/" style={{ textDecoration: 'none' }} ><div>Logout</div></Link>
            </div>
            )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
