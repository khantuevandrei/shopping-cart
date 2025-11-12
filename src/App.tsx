import { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import { Outlet, useLocation } from "react-router";
import "./App.css";

function App() {
  const [itemList, setItemList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);
  const [bgClass, setBgClass] = useState("bgImage");
  const location = useLocation();

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

  useEffect(() => {
    if (location.pathname === "/") {
      setBgClass("bgImage");
    } else {
      setBgClass("bgWhite");
    }
  }, [location.pathname]);

  return (
    <>
      <NavBar cartAmount={cartAmount} />
      <main className={`main ${bgClass}`}>
        <Outlet context={{ cartItems, setCartItems, itemList, setItemList }} />
      </main>
    </>
  );
}

export default App;
