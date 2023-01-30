import {  useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import  {cartContextProv} from "./components/Layout/HeaderCartButton";
import CartProvider from "./store/CartProvider";

function App() {
  const [showcart,setShowCart] =useState(false);

  const handleOpenCart= () =>{setShowCart(true)}
  const handleCloseCart = () =>{setShowCart(false)}
  return (
    <CartProvider>
    <cartContextProv.Provider value={handleOpenCart}>
    {showcart && <Cart onClose={handleCloseCart}/>}
      <Header />
      <main>
        <Meals />
      </main>
    </cartContextProv.Provider>
    </CartProvider>
  );
}

export default App;
