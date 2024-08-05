import React from 'react'
import { Card } from 'react-bootstrap'
import Ratings from './Ratings'
import { Link } from 'react-router-dom'

export default function Product({product}) {
  return (
    //Here we are getting the image and id of the product by passing product instace as prop
    <Card className='my-3 p-3 rounded'>
        <Link to= {`/product/${product._id}`}>
        <Card.Img src={product.image} />
        </Link>
        <Card.Body>
        <Link to= {`/product/${product._id}`}>
        <Card.Title as="div">
            <strong>{product.name}</strong>
        </Card.Title>
        </Link>
        <Card.Text as="div">
            <div as="div">
            {product.rating} from {product.numReviews} reviews

            <Ratings value="{product.rating}" text={`${product.numReviews} reviews`} color={'#f8e825'} />
            </div>
        </Card.Text >
           
        <Card.Text as="h3">
        ${product.price}
        </Card.Text>
        </Card.Body>
    </Card>
  )
}
