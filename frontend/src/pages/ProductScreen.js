import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}


export default function ProductScreen() {
    const navigate = useNavigate();
    const params = useParams();
    const { slug } = params;
    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: {},
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        fetchData();
    }, [slug]);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart } = state;
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry, product is out of stock');
            return;
        }
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
        navigate('/cart');
    }

    return (
        loading ? (
            <div>Loading...</div>
        ) : error ? (
            <div>{error}</div>
        ) : (
            <div id='product-screen'>
                <div>
                    <img src={product.image} alt={product.name} />
                </div>
                <div>
                    <Helmet>
                        <title>{product.name}</title>
                    </Helmet>
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating rating={product.rating} numReviews={product.numReviews} />
                        </li>
                        <li className='box'><div>Price:</div>
                            <div>
                                ${product.price}
                            </div>
                        </li>
                        <li className='box'>
                            <div>Status:</div>
                            <div>
                                {product.countInStock > 0 ?
                                    <span className='badge-success'>In Stock</span> :
                                    <span className='badge-fail'>Unavailable</span>
                                }
                            </div>
                        </li>
                        <li>
                            Description: {product.description}
                        </li>

                        <li>
                            <button onClick={addToCartHandler} type='button'>Add to cart</button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    )
}
