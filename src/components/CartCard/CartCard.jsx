import styles from "./CartCard.module.css";
import { useOutletContext } from "react-router";

export default function CartCard({ id, title, image, amount, price }) {
  const { cartItems, setCartItems } = useOutletContext();

  function handleChange(e) {
    let newAmount = e.target.value;

    if (newAmount === "") {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, amount: "" } : item
        )
      );
      return;
    }

    const numericValue = Number(newAmount);
    if (isNaN(numericValue)) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, amount: numericValue } : item
      )
    );
  }

  function handleIncrement() {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, amount: Number(item.amount) + 1 } : item
      )
    );
  }

  function handleDecrement() {
    if (amount === 1 || amount === "") {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, amount: Number(item.amount) - 1 } : item
        )
      );
    }
  }

  function handleDelete() {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.itemTitle}>{title}</h3>
      <img className={styles.img} src={image} alt={title} />
      <div>
        <button className={styles.change} onClick={handleDecrement}>
          -
        </button>
        <input
          onChange={handleChange}
          className={styles.itemAmount}
          type="num"
          value={amount}
        />
        <button className={styles.change} onClick={handleIncrement}>
          +
        </button>
      </div>
      <button className={styles.delete} onClick={handleDelete}>
        <img src="/bin.png" alt="delete" />
      </button>
      <h3 className={styles.itemPrice}>${(price * amount).toFixed(2)}</h3>
    </div>
  );
}
