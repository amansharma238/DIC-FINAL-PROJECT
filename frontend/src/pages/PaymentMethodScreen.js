import React, { useContext, useEffect, useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

export default function PaymentMethodScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { shippingAddress, payMethod },
    } = state;

    const [payMethodName, setPayMethodName] = useState(
        payMethod || 'Paypal'
    );

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: payMethodName });
        localStorage.setItem('payMethod', payMethodName);
        navigate('/placeorder');
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className='small-container'>
                <Helmet>
                    <title>Payment Method</title>
                </Helmet>
                <h1>Payment Method</h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <input type='radio' id='Paypal' name='payment' value='Paypal' checked={payMethodName === 'Paypal'} onChange={(e) => setPayMethodName(e.target.value)} />{' '}
                        <label htmlFor='Paypal'>PayPal</label>
                    </div>

                    <div>
                        <input type='radio' id='Stripe' name='payment' value='Stripe' checked={payMethodName === 'Stripe'} onChange={(e) => setPayMethodName(e.target.value)} />{' '}
                        <label htmlFor='Stripe'>Stripe</label>
                    </div>

                    <div>
                        <button type='submit'>Continue</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
