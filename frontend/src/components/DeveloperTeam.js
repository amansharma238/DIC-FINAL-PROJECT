import React from 'react'

export default function DeveloperTeam() {
    return (
        <div className='developer-section'>
            <h1>Our Developers</h1>
            <div>
                <div className='developer'>
                    <div>
                        <img src='/images/d1.jpg' alt='developer' />
                    </div>
                    <h3>Andrew Awet</h3>
                    <p className='developer-role'>UI developer</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quaerat tempora, voluptatum quas facere dolorum aut cumque nihil nulla harum nemo distinctio quam blanditiis dignissimos.</p>
                </div>

                <div className='developer'>
                    <div>
                        <img src='/images/d2.jpg' alt='developer' />
                    </div>
                    <h3>Alvis</h3>
                    <p className='developer-role'>Front-End developer</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quaerat tempora, voluptatum quas facere dolorum aut cumque nihil nulla harum nemo distinctio quam blanditiis dignissimos.</p>
                </div>

                <div className='developer'>
                    <div>
                        <img src='/images/d3.jpg' alt='developer' />
                    </div>
                    <h3>Alex Wood</h3>
                    <p className='developer-role'>Back-End developer</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quaerat tempora, voluptatum quas facere dolorum aut cumque nihil nulla harum nemo distinctio quam blanditiis dignissimos.</p>
                </div>
            </div>
        </div>
    )
}
