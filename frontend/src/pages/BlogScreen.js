import React from 'react'
import { Helmet } from 'react-helmet-async';

export default function BlogScreen() {
    return (
        <div>
            <Helmet>
                <title>Blog</title>
            </Helmet>
            <div className='blog-screen'>
                <h1>SHWOOD EYEWEAR</h1>
                <p>Follow along with Shwood's globe-trotting ambassadors</p>
                <div>
                    <ul>
                        <li>
                            <h3>Working With DIfferent Materials</h3>
                            <img src='/images/b1.jpg' alt='blog-img' />
                            <p>Some of the most eye catching new conceptual designs are made from surprising fabric choices that require new methods of construction. From creating the patterns through to sewing the seams there are a number of different approaches that you can try so that the design that you imagine does not become plagued by construction and process issues.</p>
                        </li>
                        <li>
                            <h3>Carefully Constructed Shoulders</h3>
                            <img src='/images/b2.jpg' alt='blog-img' />
                            <p>It is commonplace for designers to develop altered silhouettes and construction techniques that carry throughout their collections. The good designers (and those with teams of skilled crafts people) have the ability to take that detail and blend it away, so that the viewer isn’t distracted by the subtle change in silhouette. This allows for the viewer to absorb the other colours, prints and surface embellishments that become the focal points of the collection.</p>
                        </li>
                        <li>
                            <h3>Fundamentals of Pattern Making</h3>
                            <img src='/images/b3.jpg' alt='blog-img' />
                            <p>When a piece of fabric is first cut out, it has none of the markings that are seen on the pattern.</p>
                        </li>
                        <li>
                            <h3>Ways To Think About Pattern Changes and Fitting Alterations</h3>
                            <img src='/images/b4.jpg' alt='blog-img' />
                            <p>This amazing photograph,provides a perfect visual example of how to think about parts of garments as separate plates that come together to create a 3D form. Thinking about a garment in this way will help you to recognise fitting problems and to correct pattern issues.</p>
                        </li>
                        <li>
                            <h3>Clever Pattern Making Details</h3>
                            <img src='/images/b5.jpg' alt='blog-img' />
                            <p>Hoodies are best to wear when there’s snow outside, or even just a light rain. It’s made of fabric that can protect you from cold, but even if it’s a winter staple, you can also wear it when it’s hot outside because its hood can shield your head from direct sunlight. It can be considered as street wear, and from the term itself, you can see people – particularly teenagers and men in their 20s – wear hoodies in the streets. In a nutshell, dancers, skaters and even casual by-standers wear hoodies.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
