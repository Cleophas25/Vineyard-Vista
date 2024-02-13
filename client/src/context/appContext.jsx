import React, { useReducer, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { data } from "../constants";
import reducer from "./reducer";
import axios from "axios";
import { getError } from '../ultils'
import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  SETUP_PRODUCTS_BEGIN,
  SETUP_PRODUCTS_SUCCESS,
  SETUP_PRODUCTS_ERROR,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  INCREASE_CART_ITEM,
  CART_TOTAL,
  DECREASE_CART_ITEM,
  CLEAR_CART,
  SAVE_SHIPPING_ADDRESS,
  OPEN_SUBMENU,
  CLOSE_SUBMENU,
  SET_SEARCHTERM,
  SET_SELECTED_CATEGORY,
  SET_CURRENT_PAGE,
  SET_TOTAL_PAGES,
  HANDLE_PAYMENT_METHOD,
  HANDLE_NEXT_PAGE,
  HANDLE_PREV_PAGE
} from "./actions";

const initialState = {
  userLoading: true,
  isLoading: false,
  error: '',
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  products: [],
  blogPosts: [],
  cart: {
    address: localStorage.getItem("address")
      ? JSON.parse(localStorage.getItem("address"))
      : {},
    paymentMethod: "PayPal",
    cartItems: [],
    total: 0,
    quantity: 0,
  },
  isSubmenuOpen: false,
  page: { title: "", links: [] },
  submenuLocation: {},
  category: "",
  searchTerm: "",
  selectedCategory: "all",
  totalPages: 1,
  currentPage: 1,
  isChanged: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "https://vineyard-vista.onrender.com/api/v1",
  });

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status == 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const setupUser = async ({ currentUser, endPoint }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const result = await axios.post(
        `https://vineyard-vista.onrender.com/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user } = result.data;
          dispatch({
            type: SETUP_USER_SUCCESS,
            payload: { user },
          });
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: user.name,
              user: user.email,
              isAdmin: user.isAdmin,
              token: user.token,
            })
          );
          
          toast.success('Login Successful!, Redirecting...')
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR
      });
      toast.error(error.response.data.msg);
    }
  };

  const logoutUser = async () => {
    await authFetch.get(
      `https://vineyard-vista.onrender.com/api/v1/auth/logout`
    );
    dispatch({ type: LOGOUT_USER });
    localStorage.removeItem('user')
     localStorage.removeItem("shippingAddress");
  };

  const getAllProducts = async () => {
    const { currentPage, selectedCategory, searchTerm } = state;

    let url = `https://vineyard-vista.onrender.com/api/v1/products?page=${currentPage}`;

    if(selectedCategory && selectedCategory !== 'all'){
      url = url + `&category=${selectedCategory}`;
    }

    if (searchTerm) {
      url = url + `&search=${searchTerm}`;
    }
    dispatch({type: SETUP_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const { products, totalPages } = response.data
      dispatch({
        type: SETUP_PRODUCTS_SUCCESS,
        payload: products,
      });
      dispatch({
        type: SET_TOTAL_PAGES,
        payload: totalPages,
      });
    } catch (error) {
      dispatch({
        type: SETUP_PRODUCTS_ERROR,
        payload: error.message,
      });
    }
  };

  const handleSearchChange = (e) => {
    dispatch({type: SET_SEARCHTERM, payload: e.target.value})
  }

  const handleCategoryClick = (category) => {
    dispatch({type: SET_SELECTED_CATEGORY, payload: category})
  }

  const handlePageChange = (page) => {
    dispatch({type: SET_CURRENT_PAGE, payload: page})
  }

   const handleNext = () => {
      dispatch({type: HANDLE_NEXT_PAGE})
   };
   const handlePrev = () => {
     dispatch({ type: HANDLE_PREV_PAGE});
   };

  const addToCartHandler = (product) => {
    const existItem = state.cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch({ type: ADD_CART_ITEM, payload: { ...product, quantity } });
    toast.success("Item Added to Cart");
  };
  const dereaseCartItem = (id) => {
    dispatch({ type: DECREASE_CART_ITEM, payload: id });
  };
  const increaseCartItem = (id) => {
    dispatch({ type: INCREASE_CART_ITEM, payload: id });
  };

  const removeCartItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  useEffect(() => {
    dispatch({ type: CART_TOTAL });
  }, [state.cart.cartItems]);

  const clearCart = () => {
    dispatch({type:CLEAR_CART})
  }

  const saveShippingAddress = (values) => {
    dispatch({
      type: SAVE_SHIPPING_ADDRESS,
      payload: values
    });
  };

  const openSubmenu = (text, coordinates) => {
    const page = data.sublinks.find((link) => link.page === text);
    dispatch({ type: OPEN_SUBMENU, payload: { page, coordinates } });
  };
  const closeSubmenu = () => {
    dispatch({ type: CLOSE_SUBMENU });
  };

  const handlePaymentMethod = (paymentMethod) => {
    dispatch({type: HANDLE_PAYMENT_METHOD, payload: paymentMethod})
    localStorage.setItem("paymentMethod", paymentMethod);
  };

  console.log(state.products)

  return (
    <AppContext.Provider
      value={{
        ...state,
        setupUser,
        getAllProducts,
        addToCartHandler,
        dereaseCartItem,
        increaseCartItem,
        removeCartItem,
        saveShippingAddress,
        openSubmenu,
        closeSubmenu,
        logoutUser,
        handleSearchChange,
        handleCategoryClick,
        handlePageChange,
        handlePaymentMethod,
        clearCart,
        handleNext,
        handlePrev,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
