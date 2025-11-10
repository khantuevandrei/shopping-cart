import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    function handleAmount() {
      let amount = 0;
      cartItems.map((item) => {
        amount += item.amount;
      });
      setCartAmount(amount);
    }

    handleAmount();
  }, [cartItems]);

  return (
    <>
      <NavBar cartAmount={cartAmount} />
      <Outlet context={{ cartItems, setCartItems }} />
    </>
  );
}

export default App;
