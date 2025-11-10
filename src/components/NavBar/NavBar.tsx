import { Link } from "react-router";

export default function NavBar() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/cart">Cart</Link>
    </header>
  );
}
