import { useState } from "react";
import styles from "./ShopCard.module.css";
import { useOutletContext } from "react-router";

type ShopCardProps = {
  id: number;
  title: string;
  image: string;
  price: number;
};

export default function ShopCard({ id, title, image, price }: ShopCardProps) {
  const [amount, setAmount] = useState(1);
  const { cartItems, setCartItems } = useOutletContext();

  function handleChange(e) {
    const newValue = e.target.value;
    if (newValue === "") {
      setAmount("");
      return;
    }

    const numericValue = Number(newValue);
    if (isNaN(numericValue)) return;

    setAmount(numericValue);
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
    if (amount === "") return;

    const newItem = {
      id: id,
      title: title,
      price: price,
      amount: amount,
      image: image,
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

    setAmount(1);
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
          type="tel"
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
