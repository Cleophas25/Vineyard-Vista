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
  CART_TOTAL,
  INCREASE_CART_ITEM,
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
  HANDLE_PREV_PAGE,
} from "./actions";

const reducer = (state, action) => {
 if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
   if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null, cart: {...state.cart, cartItems: []}
    };
  }
  if (action.type === SETUP_PRODUCTS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      error: ''
    };
  }
  if (action.type === SETUP_PRODUCTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      error: '',
      products: action.payload,
    };
  }
  if (action.type === SETUP_PRODUCTS_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }
  if(action.type === SET_SEARCHTERM) {
    return {
      ...state,
      searchTerm: action.payload,
      currentPage: 1, isChanged: !state.isChanged
    };
  }
  if(action.type === SET_SELECTED_CATEGORY) {
    return {
      ...state,
      selectedCategory: action.payload,
      currentPage: 1,
      isChanged: !state.isChanged,
    };
  }
  if(action.type === SET_CURRENT_PAGE) {
    return {
      ...state, isChanged: !state.isChanged,
      currentPage: action.payload
    }
  }
  if(action.type === HANDLE_NEXT_PAGE) {
    return {
      ...state, isChanged: !state.isChanged,
      currentPage: state.currentPage + 1
    }
  }
  if(action.type === HANDLE_PREV_PAGE) {
    return {
      ...state, isChanged: !state.isChanged,
      currentPage: state.currentPage - 1
    }
  }
  if(action.type === SET_TOTAL_PAGES) {
    return {
      ...state,
      totalPages: action.payload
    }
  }

  if (action.type === ADD_CART_ITEM) {
    const newItem = action.payload;
    const existItem = state.cart.cartItems.find(
      (item) => item._id === newItem._id
    );
    const cartItems = existItem
      ? state.cart.cartItems.map((item) =>
          item._id === existItem._id ? newItem : item
        )
      : [...state.cart.cartItems, newItem];
    return {
      ...state,
      showAlert: true,
      cart: { ...state.cart, cartItems },
    };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: { ...state.cart, cartItems: [] } };
  }

  if (action.type === REMOVE_CART_ITEM) {
    const id = action.payload;
    const tempCart = state.cart.cartItems.filter((item) => item._id !== id);
    return {
      ...state,
      cart: { ...state.cart, cartItems: tempCart },
    };
  }

  if (action.type === INCREASE_CART_ITEM) {
    let tempCart = state.cart.cartItems.map((cartItem) => {
      if (cartItem._id === action.payload) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });

    return {
      ...state,
      cart: { ...state.cart, cartItems: tempCart },
    };
  }
  if (action.type === DECREASE_CART_ITEM) {
    let tempCart = state.cart.cartItems
      .map((cartItem) => {
        if (cartItem._id === action.payload) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.quantity !== 0);

    return {
      ...state,
      cart: { ...state.cart, cartItems: tempCart },
    };
  }
  if (action.type === CART_TOTAL) {
    let cartTotal = state.cart.cartItems.reduce(
      (cartTotal, cartItem) => {
        const { price, quantity } = cartItem;
        const itemTotal = price * quantity;

        cartTotal.total += itemTotal;
        cartTotal.quantity += quantity;
        return cartTotal;
      },
      {
        total: 0,
        quantity: 0,
      }
    );
    cartTotal.total = parseFloat(cartTotal.total.toFixed(2));

    return {
      ...state,
      cart: {
        ...state.cart,
        total: cartTotal.total,
        quantity: cartTotal.quantity,
      },
    };
  }
  if (action.type === SAVE_SHIPPING_ADDRESS) {
     return {
       ...state,
       cart: {
         ...state.cart,
         address: {...action.payload},
       },
     };

  }
  if(action.type === OPEN_SUBMENU) {
    return {
      ...state,
      isSubmenuOpen: true,
      page: action.payload.page,
      submenuLocation: action.payload.coordinates,
    };
  }
  if(action.type === CLOSE_SUBMENU) {
    return {
      ...state,
      isSubmenuOpen: false,
    }
  }
 if (action.type === HANDLE_PAYMENT_METHOD) {
    return {
      ...state, 
      cart: {
        ...state.cart,
         paymentMethod: action.payload
        }
    }
 }
 
 return state;
};

export default reducer;
