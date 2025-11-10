import { Link } from "react-router";
import styles from "./NavBar.module.css";

type NavBarProps = {
  cartAmount: number;
};

export default function NavBar({ cartAmount }: NavBarProps) {
  return (
    <header className={styles.navBar}>
      <Link to="/" className={styles.link}>
        Home
      </Link>
      <Link to="/shop" className={styles.link}>
        Shop
      </Link>
      <Link to="/cart" className={styles.link}>
        Cart: {cartAmount}
      </Link>
    </header>
  );
}
