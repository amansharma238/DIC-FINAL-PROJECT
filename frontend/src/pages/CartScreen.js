import axios from 'axios';
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store'

export default function CartScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry, product is out of stock');
            return;
        }
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    }

    const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    }

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    }

    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <div className='cart'>
                <div className='cart-screen'>
                    {cartItems.length === 0 ? (
                        <div className='message'>
                            Cart is empty. <Link to="/">Go Shopping</Link>
                        </div>
                    ) : (
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item._id}>
                                    <div>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="img-thumbnail"
                                        ></img>{' '}
                                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                    </div>

                                    <div>
                                        <button id='calculate-btn' onClick={() => updateCartHandler(item, item.quantity - 1)} disabled={item.quantity === 1}>
                                            <i className='fas fa-minus-circle'></i>
                                        </button>{' '}
                                        <span>{item.quantity}</span>{' '}
                                        <button id='calculate-btn' onClick={() => updateCartHandler(item, item.quantity + 1)} disabled={item.quantity === item.countInStock}>
                                            <i className='fas fa-plus-circle'></i>
                                        </button>{' '}
                                    </div>

                                    <div>
                                        <button id='calculate-btn' onClick={() => removeItemHandler(item)}>
                                            <i className='fas fa-trash'></i>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <div className='card'>
                        <h3>
                            Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                            items) : $
                            {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                        </h3>
                        <button
                            type="button"
                            onClick={checkoutHandler}
                            disabled={cartItems.length === 0}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
