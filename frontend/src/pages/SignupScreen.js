import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../utils/utils';

export default function SignupScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userDetail } = state;
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const { data } = await axios.post('/api/users/signup', {
                name,
                email,
                password,
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userDetail', JSON.stringify(data));
            navigate(redirect || '/');
        } catch (err) {
            toast.error(getError(err));
        }
    };

    useEffect(() => {
        if (userDetail) {
            navigate(redirect);
        }
    }, [navigate, redirect, userDetail]);

    return (
        <div>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <div className='small-container'>
                <h1>Sign Up</h1>
                <form onSubmit={submitHandler}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} required />

                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor='password'>Password</label>
                    <input type='text' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='text' id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <div>
                        <button type='submit'>Sign Up</button>
                    </div>
                    <div>
                        Already have an account?{' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
