import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';
import { getError } from '../utils/utils';

const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loading: true };
        case 'CREATE_SUCCESS':
            return { ...state, loading: false };
        case 'CREATE_FAIL':
            return { ...state, loading: false };
        default:
            return state;
    }
}

export default function PlaceOrderScreen() {
    const navigate = useNavigate();

    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
    })

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userDetail } = state;

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );

    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'CREATE_REQUEST' });
            const { data } = await axios.post(
                '/api/orders',
                {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.payMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice,
                },
                {
                    headers: {
                        authorization: `Bearer ${userDetail.token}`,
                    },
                }
            );
            ctxDispatch({ type: 'CART_CLEAR' });
            dispatch({ type: 'CREATE_SUCCESS' });
            localStorage.removeItem('cartItems');
            navigate(`/order/${data.order._id}`);

        } catch (err) {
            dispatch({ type: 'CREATE_FAIL' });
            toast.error(getError(err));
        }
    }

    useEffect(() => {
        if (!cart.payMethod) {
            navigate('/payment');
        }
    }, [cart, navigate]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <Helmet>
                <title>Preview Order</title>
            </Helmet>
            <div className='place-order-screen'>
                <h1>Preview Order</h1>
                <div>
                    <div>
                        <div className='place-order-box'>
                            <div>
                                <h2>Shipping</h2>
                                <div>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address: </strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                                    {cart.shippingAddress.country}
                                </div>
                                <Link to="/shipping">Edit</Link>
                            </div>
                        </div>

                        <div className='place-order-box'>
                            <div>
                                <h2>Payment</h2>
                                <div>
                                    <strong>Method:</strong> {cart.payMethod}
                                </div>
                                <Link to="/payment">Edit</Link>
                            </div>
                        </div>

                        <div className='place-order-box'>
                            <div>
                                <h2>Items</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
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
                                                <div>
                                                    Quantity: <span>{item.quantity}</span>
                                                </div>
                                                <div>
                                                    Price: ${item.price}
                                                </div>
                                            </div>

                                        </li>
                                    ))}
                                </ul>
                                <Link to="/cart">Edit</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='order-summary'>
                            <h2>Order Summary</h2>
                            <ul>
                                <li>
                                    <div>
                                        Items:
                                        <span>${cart.itemsPrice.toFixed(2)}</span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        Shipping
                                        <span>${cart.shippingPrice.toFixed(2)}</span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        Tax
                                        <span>${cart.taxPrice.toFixed(2)}</span>
                                    </div>
                                </li>
                                <li>
                                    <div>

                                        <strong> Order Total: </strong>
                                        <span>
                                            <strong>${cart.totalPrice.toFixed(2)}</strong>
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={placeOrderHandler}
                                            disabled={cart.cartItems.length === 0}
                                        >
                                            Place Order
                                        </button>
                                    </div>
                                </li>
                                <li>{loading && <div>loading...</div>}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
