import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SummitAndEventScreen() {
    return (
        <div>
            <Helmet>
                <title>Events</title>
            </Helmet>
            <div className='events'>
                <h1>
                    All past and future events
                </h1>
                <hr />
                <div>
                    <ul>
                        <li>
                            <img src='/images/e1.jpg' alt='event' />
                            <p>Street fashion: milan 22 Dec 2022</p>
                        </li>

                        <li>
                            <img src='/images/e2.jpg' alt='event' />
                            <p>The fast and fashionable event: Washington 20 Aug 2022</p>
                        </li>

                        <li>
                            <img src='/images/e3.jpg' alt='event' />
                            <p>Opening a new store in India Rajasthan: 14 Nov 2022</p>
                        </li>

                        <li>
                            <img src='/images/e5.jpg' alt='event' />
                            <p>New product Launching Event, New York: 15 May 2022</p>
                        </li>

                        <li>
                            <img src='/images/e4.jpg' alt='event' />
                            <p>Meet Greet, Bermingem England: 13 March 2022</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
