import React, { useState } from "react";
import '../styling/Login.css';
import qlogo from '../assets/white.svg';
import checkedNoLabel from '../assets/checked-no-label.svg';
import { apiService } from "../services/api.service";

export default function Login() {

    const [login, setLogin] = useState('');
    const [pwd, setPwd] = useState('');

    const validateLogin = async (event) => {
        event.preventDefault();
        let loginStatus = await apiService.validateLogin(login, pwd);
        if (loginStatus === undefined) {
            alert('No valid response from server at this moment. Please try again later');
            console.log('No valid response from Backend API.');
        }
        else if (!loginStatus) alert('Invalid login or password. Please try again.');
        else {
            console.log('Login successful.');
            localStorage.setItem('login', login);
            window.location = '/quote';
        }
    };

    return (
        <div>
            <div className="Mask-Login">
                <img className="q-logo" src={qlogo} alt="Qover" />
                <div className="Rectangle-Copy">
                    <div className="Welcome-at-Qover Text-Style-2">
                        Welcome at Qover
                    </div>
                    <form className="login-form" onSubmit={validateLogin}>
                        <div className="input-fields-section">
                            <div className="input-email-section">
                                <div className="email input-labels">Email</div>
                                <input type="text" className="input-fields" value={login} onChange={e => setLogin(e.target.value)} required />
                            </div>
                            <div className="input-pwd-section">
                                <div className="pwd input-labels">Password</div>
                                <input type="password" className="input-fields" value={pwd} onChange={e => setPwd(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="form-labels">
                            <div className="div-remember-me">
                                <img src={checkedNoLabel} className="img-remember-me" alt="check" />
                                <span className="input-remember-me-text">Remember me</span>
                            </div>
                            <div className="forgot-pwd">
                                <span>Forgot your password?</span>
                            </div>
                        </div>
                        <div className="form-actions">
                            <div className="">
                                <input className="Text form-btn Rectangle-Copy-3" type="submit" value="Sign in to your account" />
                            </div>
                        </div>

                    </form>
                </div>
                <div className="form-help Rectangle-Copy-2">
                    <span className="Text">
                        <b>Don't have an account? <span className="Text-Underline">Ask access</span></b>
                    </span>
                </div>
            </div>
        </div>

    )

}