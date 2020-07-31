import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HOC from '../HOC';
import Header from './template/Header';
import SideBar from './template/SideBar';
import Dashboard from './dashboard/Dashboard';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        // if (localStorage.getItem('accessToken') === undefined || localStorage.getItem('accessToken') === null) {
        //     this.props.history.push('/login')
        //     return;
        // }
    }

    handlelogOut = () => {
        localStorage.clear();
        this.props.history.push('/login')
    }

    render() {
        return (
            <HOC>
                <Header />
                <SideBar handlelogOut={this.handlelogOut} />
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Redirect from="/" to="/dashboard" />
                </Switch>
            </HOC>
        )
    }
}


export default Layout;