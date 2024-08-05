import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,

} from "../constants/orderConstants";
import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";


export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post('/api/orders/add/', order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems')

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};


export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log('User Info:', userInfo); // Debug log

    if (!userInfo) {
      throw new Error('User not logged in');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log('Config:', config); // Debug log

    const { data } = await axios.get(`/api/orders/${id}/`, config);

    console.log('Order Details Data:', data); // Debug log

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.error('Error fetching order details:', error); // Debug log
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};


export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
       type: ORDER_PAY_REQUEST
       });

    const {
      userLogin: { userInfo },
    } = getState();

    if (!userInfo) {
      throw new Error('User not logged in');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };


    const { data } = await axios.get(
      `/api/orders/${id}/pay/`,
      paymentResult,
      config);


    dispatch({ 
      type: ORDER_PAY_SUCCESS, 
      payload: data
     });

  } catch (error) {
    console.error('Error fetching order details:', error); // Debug log
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};