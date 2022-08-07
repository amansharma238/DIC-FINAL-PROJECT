import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

export default function ShippingAddressScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        userDetail,
        cart: { shippingAddress },
    } = state;
    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    useEffect(() => {
        if (!userDetail) {
            navigate('/signin?redirect=/shipping');
        }
    }, [userDetail, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country,
            },
        });

        localStorage.setItem('shippingAddress', JSON.stringify({
            fullName,
            address,
            city,
            postalCode,
            country,
        })
        );
        navigate('/payment');
    }
    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps step1 step2 />
            <div className='small-container'>
                <h1>Shipping Address</h1>
                <form onSubmit={submitHandler}>
                    <label htmlFor='fullname'>Full Name</label>
                    <input type='text' id='fullname' value={fullName} onChange={(e) => setFullName(e.target.value)} required />

                    <label htmlFor='address'>Address</label>
                    <input type='text' id='address' value={address} onChange={(e) => setAddress(e.target.value)} required />

                    <label htmlFor='city'>City</label>
                    <input type='text' id='city' value={city} onChange={(e) => setCity(e.target.value)} required />

                    <label htmlFor='postal'>Postal Code</label>
                    <input type='number' id='postal' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />

                    <label htmlFor='country'>Country</label>
                    <input type='text' id='country' value={country} onChange={(e) => setCountry(e.target.value)} required />

                    <div>
                        <button type='submit'>Continue</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
