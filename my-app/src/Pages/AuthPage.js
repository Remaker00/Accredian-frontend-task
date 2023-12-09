import React, { useState } from 'react';
import Person2Icon from '@mui/icons-material/Person2';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HttpsIcon from '@mui/icons-material/Https';
import axios from 'axios';
import Image from './images/img1.jpg';
import './Style.css';

const AuthPage = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const toggleForm = () => {
        setIsSignup(!isSignup);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignup) {
            if (formData.password !== formData.confirm_password) {
                alert('Password and Confirm Password do not match');
            } else {
                const dataToSend = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                };
                console.log("Data IS:", dataToSend);

                try {
                    await axios.post('http://localhost:4000/user/signup', dataToSend);
                    alert('Account Successfully Created');
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        confirm_password: '',
                    });
                } catch (error) {
                    alert(error.response.data);
                }
            }
        } else {
            try {
                await axios.post('http://localhost:4000/user/login', formData);
                alert('Successfully Logged In: ');

                setFormData({
                    email: '',
                    password: ''
                });
            } catch (error) {
                alert(error.response.data);
            }
        }
    };

    return (
        <div className="main-container">
            <div className="auth-container">
                <div className={`auth-form ${isSignup ? 'signup-form' : 'login-form'}`}>
                    <h1>{isSignup ? 'SIGN UP' : 'LOGIN'}</h1>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="form-group">
                                <label><Person2Icon /></label>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder='User Name'
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <label><EmailOutlinedIcon /></label>
                            <input
                                type="email"
                                name='email'
                                placeholder='Email'
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label><LockOpenIcon /></label>
                            <input
                                type="password"
                                name='password'
                                placeholder='Password'
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        {isSignup && (
                            <div className="form-group">
                                <label><HttpsIcon /></label>
                                <input
                                    type="password"
                                    name='confirm_password'
                                    placeholder='Confirm Password'
                                    required
                                    value={formData.confirm_password}
                                    onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                                />
                            </div>
                        )}
                        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
                    </form>
                    <div className="form-switch">
                        <span>
                            {isSignup ? 'Already have an account? ' : 'Don\'t have an account? '}
                        </span>
                        <button type="button" onClick={toggleForm}>
                            {isSignup ? 'Login' : 'Sign Up'}
                        </button>
                    </div>
                </div>
            </div>
            <img src={Image} alt='Background' />
        </div>
    );
};

export default AuthPage;
