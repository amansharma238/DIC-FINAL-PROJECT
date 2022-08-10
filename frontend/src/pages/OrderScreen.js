import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../utils/utils';
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default function OrderScreen() {
    const navigate = useNavigate();
    const { state } = useContext(Store);
    const params = useParams();
    const { id: orderId } = params;
    const { userDetail } = state;
    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: ''
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userDetail.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };

        if (!userDetail) {
            navigate('/signin');
        }

        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();
        }
    }, [userDetail, navigate, order, orderId]);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div className='place-order-screen'>
                    <Helmet>
                        <title>Order {orderId}</title>
                    </Helmet>
                    <h1 className="my-3">Order {orderId}</h1>
                    <div>
                        <div>
                            <div className='place-order-box'>
                                <h3>Shipping</h3>
                                <div>
                                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Address: </strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                    ,{order.shippingAddress.country}
                                </div>
                                {order.isDelivered ? (
                                    <div className='message-success'>
                                        Delivered at {order.deliveredAt}
                                    </div>
                                ) : (
                                    <div className='message-danger'>Not Delivered</div>
                                )}

                            </div>

                            <div className='place-order-box'>
                                <h3>Payment</h3>
                                <div>
                                    <strong>Method:</strong> {order.paymentMethod}
                                </div>
                                {order.isPaid ? (
                                    <div className='message-success'>
                                        Paid at {order.paidAt}
                                    </div>
                                ) : (
                                    <div className='message-danger'>Not Paid</div>
                                )}

                            </div>

                            <div className='place-order-box'>
                                <h3>Items</h3>
                                <ul>
                                    {order.orderItems.map((item) => (
                                        <li key={item._id}>
                                            <div className="align-items-center">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="img-thumbnail"
                                                    ></img>{' '}
                                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                </div>
                                                <div>
                                                    <span>{item.quantity}</span>
                                                </div>
                                                <div>${item.price}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>

                        <div>
                            <div className='order-summary'>
                                <h3>Order Summary</h3>
                                <ul>
                                    <li>
                                        <div>
                                            <div>Items</div>
                                            <div>${order.itemsPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <div>Shipping</div>
                                            <div>${order.shippingPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <div>Tax</div>
                                            <div>${order.taxPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <div>
                                                <strong> Order Total</strong>
                                            </div>
                                            <div>
                                                <strong>${order.totalPrice.toFixed(2)}</strong>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div>
                                            <button type="button">
                                                Pay
                                            </button>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
