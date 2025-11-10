import { useState } from "react";
import styles from "./Card.module.css";
import { useOutletContext } from "react-router";

type CardProps = {
  id: number;
  title: string;
  image: string;
  price: number;
};

export default function Card({ id, title, image, price }: CardProps) {
  const [amount, setAmount] = useState(0);
  const { cartItems, setCartItems } = useOutletContext();

  function handleChange(e) {
    const newAmount = e.target.value;
    if (!Number(newAmount)) return;
    setAmount(Number(newAmount));
  }

  function handleIncrement() {
    setAmount((prev) => prev + 1);
  }

  function handleDecrement() {
    if (amount === 0) return;
    setAmount((prev) => prev - 1);
  }

  function handleBuy() {
    if (amount === 0) return;

    const newItem = {
      id: id,
      title: title,
      price: price,
      amount: amount,
    };

    setCartItems((prevItems) => {
      const foundItem = prevItems.find((item) => item.id === newItem.id);

      if (foundItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, amount: item.amount + newItem.amount }
            : item
        );
      } else {
        return [...prevItems, newItem];
      }
    });
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.itemTitle}>{title}</h2>
      <img className={styles.img} src={image} alt={title} />
      <h2 className={styles.itemPrice}>${price}</h2>
      <div>
        <button onClick={handleDecrement}>-</button>
        <input
          onChange={handleChange}
          className={styles.quantity}
          type="num"
          value={amount}
        />
        <button onClick={handleIncrement}>+</button>
      </div>
      <button onClick={handleBuy} className={styles.buy}>
        Add To Cart
      </button>
    </div>
  );
}
