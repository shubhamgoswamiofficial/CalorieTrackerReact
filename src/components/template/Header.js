import React from 'react';
const toggleClass = () => document.body.classList.toggle("sidebar_close");

const Header = props => {
    return (
        <header>
              <div className="cm_logo">
                {/* <img src={Logo} alt="Fitplus" /> */}
            </div>
            <div onClick={toggleClass} className="sidebar_toggle"><i className="fa fa-bars" aria-hidden="true"></i></div>
        </header>
    );
}

export default Header;