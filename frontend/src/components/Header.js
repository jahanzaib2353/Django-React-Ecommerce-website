import React from 'react'
import { Container,  Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {  logout } from '../actions/userActions'

export default function Header() {
  //Adding navbar in our header

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo }  = userLogin

  const dispatch = useDispatch()


  const logoutHandler = ()=>{
    dispatch(logout())
  }

  return (
    <header>
      

       <Navbar expand="lg" className="bg-dark " variant='dark' collapseOnSelect>
      <Container >
        <LinkContainer to={'/'}>
        <Navbar.Brand>Proshop</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <LinkContainer to={'/cart'}>
            <Nav.Link> <i class="fas fa-shopping-cart"></i>Cart</Nav.Link>
            </LinkContainer>
            
            {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

            </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                    <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                </LinkContainer>
            )}
             {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
             )}

           
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}
