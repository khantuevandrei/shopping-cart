import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router";

function App() {
  const [cartItems, setCartItems] = useState(0);
  return (
    <>
      <NavBar cartItems={cartItems} />
      <Outlet />
    </>
  );
}

export default App;
