import { useOutletContext } from "react-router";
import styles from "./Cart.module.css";
import Card from "../ShopCard/ShopCard";

export default function Cart() {
  const { cartItems, setCartItems } = useOutletContext();

  function handleIncrement() {}

  return (
    <>
      <h2 className={styles.heading}>Your Cart:</h2>
      <div className={styles.cardGrid}>
        {cartItems.map((item) => {
          return (
            <div className={styles.card}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <img className={styles.img} src={item.image} alt="" />
              <div>
                <button>-</button>
                <input
                  className={styles.itemAmount}
                  type="num"
                  value={item.amount}
                />
                <button>+</button>
              </div>

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
