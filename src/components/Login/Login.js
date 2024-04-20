import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsSignUp(!isSignUp);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        try {
            let response;
            if (isSignUp) {
                response = await axios.post('http://localhost:4000/user/signup', {
                    username: formData.get('Name'),
                    email: formData.get('Email'),
                    password: formData.get('Password')
                });
                setMessage(response.data.message);
                setOpen(true);
                if (response.data.message === 'User registered successfully') {
                    setIsSignUp(false);
                    form.reset();
                }
            } else {
                response = await axios.post('http://localhost:4000/user/login', {
                    email: formData.get('Email'),
                    password: formData.get('Password')
                });
                setMessage(response.data.message);
                setOpen(true);
                if (response.data.message === 'Logged in successfully') {
                    sessionStorage.setItem('token', response.data.token);
                    sessionStorage.setItem('username', formData.get('Email'));
                    navigate('/home');
                    window.location.reload();
                }
            }
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Something went wrong');
            setOpen(true);
        }
    };

    return (
        <div className={`container ${isSignUp ? 'active' : ''}`}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{isSignUp ? 'Sign Up' : 'Sign In'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className="btn btn-primary">
                        Close
                    </button>
                </DialogActions>
            </Dialog>
            <div className="form-container sign-up">
                <form onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <i className="fab fa-google-plus-g"></i>
                        </a>
                        <a href="#" className="icon">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="icon">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#" className="icon">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" name="Name" placeholder="Name" />
                    <input type="email" name="Email" placeholder="Email" />
                    <input type="password" name="Password" placeholder="Password" />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <i className="fab fa-google-plus-g"></i>
                        </a>
                        <a href="#" className="icon">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="icon">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#" className="icon">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                    <span>or use your email and password</span>
                    <input type="email" name="Email" placeholder="Email" />
                    <input type="password" name="Password" placeholder="Password" />
                    <a href="">Forgot your email or password?</a>
                    <button type="submit">Sign in</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button className="hidden" onClick={handleToggle}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, User!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className="hidden" onClick={handleToggle}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
