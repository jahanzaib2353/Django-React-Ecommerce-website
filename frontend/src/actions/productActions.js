import axios from 'axios'
import {PRODUCT_LIST_FAIL, 
        PRODUCT_LIST_SUCCESS,
        PRODUCT_LIST_REQUEST,

        PRODUCT_DETAILS_FAIL, 
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_REQUEST,

        PRODUCT_DELETE_REQUEST,
        PRODUCT_DELETE_SUCCESS,
        PRODUCT_DELETE_FAIL,
}
    from '../constants/productConstants'

export const listProducts = () => async(dispatch)=>{

    try{
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })
        const {data} = await axios.get('/api/products/')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
        type:PRODUCT_LIST_FAIL,
        payload:error.response && error.response.data.message
        ? error.response.data.message
        :error.message
        })

            
    }  

}
export const listProductsDetails = (id) => async(dispatch)=>{

    try{
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })
        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
        type:PRODUCT_DETAILS_FAIL,
        payload:error.response && error.response.data.message
        ? error.response.data.message
        :error.message
        })

            
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/products/delete/${id}/`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

