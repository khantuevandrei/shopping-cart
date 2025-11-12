import { useOutletContext } from "react-router";
import styles from "./Cart.module.css";
import CartCard from "../CartCard/CartCard";

export default function Cart() {
  const { cartItems, setCartItems } = useOutletContext();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Your Cart:</h2>
      <div className={styles.cardGrid}>
        {cartItems.map((item) => {
          return (
            <CartCard
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              amount={item.amount}
              price={item.price}
            />
          );
        })}
      </div>
      <h2 className={styles.heading}>
        Total: $
        {cartItems
          .reduce((acc, curr) => acc + curr.price * curr.amount, 0)
          .toFixed(2)}
      </h2>
    </div>
  );
}
