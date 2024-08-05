import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import Ratings from '../components/Ratings';
import {useDispatch,useSelector} from 'react-redux'
import { listProductsDetails } from '../actions/productActions';
import Loader from '../components/Loader'
import Message from '../components/Message'

// import axios from 'axios';

export default function ProductScreen() {
  const [qty, setQty] = useState(1)

  const { id } = useParams()  // Extract id from URL parameters
  const dispatch = useDispatch()
  const navigate = useNavigate()    // const[product, setProduct] = useState([])
  useEffect(() => {
    dispatch(listProductsDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

    
    // async function fetchProduct(){
    //   const { data } = await axios.get(`/api/products/${id}`);
    //   setProduct(data)

    // }
    // fetchProduct()


  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  
  
  // const { id } = useParams();
  // const product = products.find((p) => p._id === id)
  return (
    <div>
        <Link  to={'/'} className='btn btn-light my-3' >Go back</Link>
        {loading ?
                <Loader />
                : error
                  ? <Message variant='danger'>{error}</Message>
                : error
        }
        <Row>
      <Col md={6}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>

      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
          </ListGroup.Item>
          <ListGroup.Item>
            Price: ${product.price}
          </ListGroup.Item>
          <ListGroup.Item>
            Description: {product.description}
          </ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={3}>
      <ListGroup variant='flush'>
        <ListGroup.Item>
        <Row>
        <Col>
        Price:
        </Col>
        <Col><strong>${product.price}</strong></Col>
        </Row>
        </ListGroup.Item>
      </ListGroup>

      <ListGroup variant='flush'>
        <ListGroup.Item>
        <Row>
        <Col>
        Status:
        </Col>
        <Col><strong>{product.countInStock > 0 ? 'In Stock' : 'Not in stock' }</strong></Col>
        </Row>
        </ListGroup.Item>
        {
          product.countInStock > 0 && (
            <ListGroup.Item>
              <Row>
                <Col>Qty</Col>
                <Col>
                <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
          )
        }

        <ListGroup.Item>
        <Button 
        onClick={addToCartHandler}
        className='btn-block'
        disabled={product.countInStock ===0 } 
        type='button'>Add to Cart</Button>
      </ListGroup.Item>
      </ListGroup>

      
      </Col>
    </Row>
    </div>
  )
}
