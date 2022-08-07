import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils/utils';

export default function SigninScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userDetail } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/signin', {
                email,
                password,
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userDetail', JSON.stringify(data));
            navigate(redirect || '/')
        } catch (err) {
            toast.error(getError(err));
        }
    }

    useEffect(() => {
        if (userDetail) {
            navigate(redirect);
        }
    }, [navigate, redirect, userDetail]);

    return (
        <div className='small-container'>
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <div>
                <h1>Sign In</h1>
            </div>
            <form onSubmit={submitHandler}>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' required onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor='pwd'>Password</label>
                <input type='password' id='pwd' required onChange={(e) => setPassword(e.target.value)} />
                <div>
                    <button type='submit'>Sign In</button>
                </div>
                <div>
                    New customer?{' '}
                    <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                </div>
            </form>
        </div>
    )
}
