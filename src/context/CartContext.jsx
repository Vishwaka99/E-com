import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload };
    case 'ADD_TO_CART': {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [userId] = useState(() => {
    const id = localStorage.getItem('lubrimax-userId') || 'user_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('lubrimax-userId', id);
    return id;
  });

  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from MongoDB on mount
  useEffect(() => {
    fetch(`/api/cart/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.items) {
          dispatch({ type: 'SET_CART', payload: data.items });
        }
        setIsInitialized(true);
      })
      .catch(err => {
        console.error('Error fetching cart from MongoDB:', err);
        setIsInitialized(true); // Still initialize to not block UI
      });
  }, [userId]);

  // Sync to MongoDB on change
  useEffect(() => {
    if (!isInitialized) return; // Prevent overwriting cart before loading it

    fetch(`/api/cart/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: state.items })
    }).catch(err => console.error('Error saving cart to MongoDB:', err));
    
  }, [state.items, isInitialized, userId]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart: state, dispatch, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
