import { Link } from "react-router";
import styles from "./NavBar.module.css";

export default function NavBar({ cartAmount }) {
  return (
    <header className={styles.navBar}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logo}>
          <h1 className={styles.heading}>Tote</h1>
          <p className={styles.para}>Designer clothes & accessories</p>
        </div>
      </Link>
      <div className={styles.middle}>
        <Link to="/" className={styles.link}>
          About
        </Link>
        <Link to="/shop" className={styles.link}>
          Shop
        </Link>
      </div>
      <Link to="/cart" className={styles.cart}>
        <img
          className={styles.icon}
          src="/shopping-cart.png"
          alt="shopping cart"
        />
        <div className={styles.amount}>{cartAmount}</div>
      </Link>
    </header>
  );
}
