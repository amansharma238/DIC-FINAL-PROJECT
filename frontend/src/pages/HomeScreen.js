import React, { useEffect, useReducer } from 'react'
import axios from 'axios';
import Stats from '../components/Stats';
import Gallary from '../components/Gallary';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import DeveloperTeam from '../components/DeveloperTeam';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default function HomeScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products/');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Helmet>
                <title>Aman Clothing</title>
            </Helmet>
            <div className='home-page'>
                <div>
                    <section>
                        <h1>Aman's Clothing</h1>
                    </section>
                </div>
            </div>
            <div className="products">
                <h1>Featured Products</h1>
                <div>
                    {
                        loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>{error}</div>
                        ) : (
                            products.map(product => (
                                <div key={product.slug}>
                                    <Product duct product={product} />
                                </div>
                            )
                            )
                        )
                    }
                </div>
            </div>
            <Stats />
            <Gallary />
            <DeveloperTeam />
        </div>
    )
}
