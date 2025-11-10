import { Link } from "react-router";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <header className={styles.navBar}>
      <Link to="/" className={styles.link}>
        Home
      </Link>
      <Link to="/shop" className={styles.link}>
        Shop
      </Link>
      <Link to="/cart" className={styles.link}>
        Cart
      </Link>
    </header>
  );
}
