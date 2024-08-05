import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Checkoutsteps from '../components/Checkoutsteps'
import { savePaymentMethod } from '../actions/cartActions'

export default function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart


    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    if(!shippingAddress){
        navigate('/shipping')
    }
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
  return (
    <FormContainer>
        <Checkoutsteps/>
    <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check
                    type='radio'
                    label='PayPal or Credit Card'
                    id='paypal'
                    name='paymentMethod'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >

                </Form.Check>
            </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
            Continue
        </Button>
    </Form>
</FormContainer>
  )
}
