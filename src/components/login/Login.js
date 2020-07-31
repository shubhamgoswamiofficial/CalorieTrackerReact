import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../config/services/usersService';
import { LoaderSvg } from '../Reusable'
import { toast } from 'react-toastify';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            emailErrorMsg: '',
            passwordErrorMsg: '',
            errors: false,
            Loader: false,
            validationError: '',
            isShowPassword: false,
        }
    }

    handleChange = (event) => {
        let {name, value} = event.target
        this.setState({
            [name]: value, errors: false, validationError: '', emailErrorMsg: '', passwordErrorMsg: ''
        })
    }

    ShowPassword = () => {
        this.setState({ isShowPassword: !this.state.isShowPassword })
    }

    handleValidetion = () => {
        let { email, password } = this.state
        if (!email) {
            this.setState({ emailErrorMsg: "Enter Email" })
            return false
        } else if (!password) {
            this.setState({ passwordErrorMsg: "Enter Password" })
            return false
        } else {
            return true
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.handleValidetion()) {
            let obj = {
                email: this.state.email.toLowerCase(),
                password: this.state.password,
            }
            this.setState({ Loader: true })
            login(obj)
                .then(res => {
                    let response = res.data
                    if (response.statusCode === 1) {
                        localStorage.setItem('accessToken', response.responseData.accessToken);
                        axios.defaults.headers.common['accessToken'] = `${localStorage.getItem('accessToken')}`;
                        axios.defaults.headers.common['Authorization'] = `${'Basic ZGVtbzpkZW1v'}`;


                        this.props.history.push('/dashboard/');
                        toast.success(response.responseData.message, {position: "top-left"})
                        this.setState({ Loader: false })
                    }
                    else if (response.statusCode === 0) {
                        this.setState({ validationError: response.error.responseMessage, Loader: false })
                    }
                })
        }
    }

    render() {
        let { validationError, email, password, emailErrorMsg, passwordErrorMsg, isShowPassword, Loader } = this.state
        if (localStorage.getItem('accessToken')) {
            this.props.history.push('/dashboard')
        }
        return (
            <div className="login-wrapper" style={{ backgroundImage: `url(${require('../../assets/images/background.png')})` }} >
                <div className="container h-100">
                    <div className="row h-100">
                        <div className="col-md-6 m-auto">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title">
                                        <h3 id="cm_message">User Login</h3>
                                        {validationError && <p className=" form-control is-invalid">{validationError}</p>}
                                    </div>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                className={`form-control mb-4 ${emailErrorMsg ? 'is-invalid' : ''}`}
                                                type="email"
                                                name="email"
                                                placeholder="Enter Email"
                                                onChange={this.handleChange}
                                                value={email}
                                            />
                                            <div className="cm_alert_danger">{emailErrorMsg}</div>

                                        </div>
                                        <div className="form-group cm_show_pass">
                                            <input
                                                className={`form-control ${passwordErrorMsg ? 'is-invalid' : ''}`}
                                                type={isShowPassword ? 'text' : 'password'}
                                                name="password"
                                                placeholder="Enter Password"
                                                onChange={this.handleChange}
                                                value={password}
                                            />
                                            <div className="cm_alert_danger">{passwordErrorMsg}</div>
                                            <i
                                                className={`fa fa-eye${isShowPassword ? '' : '-slash'}`}
                                                onClick={this.ShowPassword}
                                                aria-hidden="true"></i>
                                        </div>

                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col"><button className="btn btn-primary" type="submit">Login</button></div>
                                                <div className="col text-right pt-2"><Link to="/register">Don't have an account? SignUp</Link></div>
                                            </div>
                                        </div>

                                        {Loader && <div className="loader_wrapper"><LoaderSvg /></div>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
