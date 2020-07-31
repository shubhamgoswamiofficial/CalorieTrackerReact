import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = props => {
    return(
        <div className="cm_sidebar">
            <ul>
                <li><NavLink title="Dashboard" to="/dashboard" activeClassName="active"><i className="fa fa-home" ></i> &nbsp;&nbsp; Dashboard</NavLink></li>
            </ul>

            <ul className="cm_admin_links">
                <li><span title="logout" onClick={props.handlelogOut}><i className="fa fa-sign-out"></i>&nbsp; Logout</span></li>
           </ul>
        </div>
    )
}

export default SideBar;