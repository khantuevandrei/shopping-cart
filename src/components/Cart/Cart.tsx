import { useOutletContext } from "react-router";
import styles from "./Cart.module.css";

export default function Cart() {
  const { cartItems, setCartItems } = useOutletContext();

  return (
    <>
      <h2 className={styles.heading}>Your Cart:</h2>
      <div className={styles.cardGrid}>
        {cartItems.map((item) => {
          return (
            <div className={styles.card}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <img className={styles.img} src={item.image} alt="" />
              <p className={styles.itemAmount}>{item.amount} pcs</p>
              <p className={styles.itemPrice}>
                Price: ${item.price * item.amount}
              </p>
            </div>
          );
        })}
      </div>
      <h2 className={styles.heading}>
        Total: $
        {cartItems
          .reduce((acc, curr) => acc + curr.price * curr.amount, 0)
          .toFixed(2)}
      </h2>
    </>
  );
}
