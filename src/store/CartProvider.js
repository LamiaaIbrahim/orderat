import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let updatedItems;
  if (action.type === "ADD") {
    
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
        items:updatedItems,
        totalAmount:updatedTotalAmount
    }

  }

  if(action.type === 'REMOVE'){
    const removedItem = action.id;
    
    let upatedItem = state.items.find(item => item.id === removedItem);
    console.log(upatedItem)
    let indexOfUpdatedItem = state.items.findIndex(item => item.id === removedItem)
    const updatedItemAmount = upatedItem.amount - 1;
    const updatedTotalAmount = state.totalAmount - upatedItem.price ;
    console.log(`updatedItemAmount:${updatedTotalAmount}`);
    
    if (upatedItem.amount === 1) {
          updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
        upatedItem = { ...upatedItem , amount: updatedItemAmount };
        updatedItems = [...state.items];
        updatedItems[indexOfUpdatedItem] = upatedItem;
      }
      console.log(updatedItems);
    
    return {
      items:updatedItems,
      totalAmount:updatedTotalAmount
  }
    
  }
  return defaultCartState;

};
const CartProvider = (props) => {
  const [cartState, dispathCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispathCartAction({ type: "ADD", item: item });
  };
  const removeItemToCartHandler = (id) => {
    dispathCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
