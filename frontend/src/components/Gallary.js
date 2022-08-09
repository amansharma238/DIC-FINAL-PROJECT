import React from 'react'

export default function Gallary() {
    return (
        <div>
            <div className='gallary'>
                <h1>Gallery</h1>
                <div>
                    <ul>
                        <li className='img-container'>
                            <img src='/images/gallary1.jpg' alt='img' />
                        </li>
                        <li className='img-container'>
                            <img src='/images/gallary2.jpg' alt='img' />
                        </li>
                        <li className='img-container'>
                            <img src='/images/gallary3.jpg' alt='img' />
                        </li>
                        <li className='img-container'>
                            <img src='/images/shirt-collection.jpg' alt='img' />
                        </li>
                        <li className='img-container'>
                            <img src='/images/gallary4.jpg' alt='img' />
                        </li>
                        <li className='img-container'>
                            <img src='/images/t-shirts.png' alt='img' />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
