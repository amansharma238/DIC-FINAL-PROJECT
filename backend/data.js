import bcrypt from 'bcryptjs';
const data = {
    products: [
        {
            name: 'Nike shirt',
            slug: 'nike-shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 2,
            description: 'blue color and best quality shirt',
        },
        {
            name: 'Nike pant',
            slug: 'nike-pant',
            category: 'Pants',
            image: '/images/p3.jpeg',
            price: 50,
            countInStock: 5,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 2,
            description: 'best quality pant',
        },
        {
            name: 'Adidas shirt',
            slug: 'adidas-shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 89,
            countInStock: 12,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 2,
            description: 'best quality shirt',
        },
        {
            name: 'Adidas pant',
            slug: 'adidas-pant',
            category: 'Pants',
            image: '/images/p4.jpg',
            price: 199,
            countInStock: 0,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 2,
            description: 'best quality pant',
        },
    ],
    users: [
        {
            name: 'aman',
            email: 'amansharma122000@gmail.com',
            password: bcrypt.hashSync('Aman1234'),
            isAdmin: true,
        },
        {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('12345678'),
            isAdmin: false,
        },
    ],
}

export default data;