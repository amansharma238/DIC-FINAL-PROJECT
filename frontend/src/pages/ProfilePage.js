import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../utils/utils';

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };
        default:
            return state;
    }
};

export default function ProfilePage() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userDetail } = state;

    const [name, setName] = useState(userDetail.name);
    const [email, setEmail] = useState(userDetail.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put(
                '/api/users/profile',
                {
                    name,
                    email,
                    password,
                },
                {
                    headers: { Authorization: `Bearer ${userDetail.token}` },
                }
            );
            dispatch({
                type: 'UPDATE_SUCCESS',
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userDetail', JSON.stringify(data));
            toast.success('User updated successfully');
            console.log(confirmPassword);

        } catch (err) {
            dispatch({ type: 'FETCH_FAIL', });
            toast.error(getError(err));
        }
    };

    return (
        <div className='small-container'>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <div>
                <h1>User Profile</h1>
            </div>

            <form onSubmit={submitHandler}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' required onChange={(e) => setName(e.target.value)} value={name} />
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' required onChange={(e) => setEmail(e.target.value)} value={email} />
                <label htmlFor='pwd'>Password</label>
                <input type='password' id='pwd' onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor='confirmpwd'>Confirm Password</label>
                <input type='password' id='confirmpwd' onChange={(e) => setConfirmPassword(e.target.value)} />
                <div>
                    <button type='submit'>Update</button>
                </div>
            </form>


        </div>
    )
}
