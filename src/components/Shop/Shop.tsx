import { useEffect, useState } from "react";
import styles from "./Shop.module.css";

export default function Shop() {
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        setIsLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch items");
        const data = await response.json();
        setItemList(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems();
  }, []);

  if (isLoading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.cardGrid}>
      {itemList.map((item) => {
        return (
          <div key={item.id} className={styles.card}>
            <h2 className={styles.itemTitle}>{item.title}</h2>
            <img className={styles.img} src={item.image} alt={item.title} />
            <h2 className={styles.itemPrice}>${item.price}</h2>
            <div>
              <button>-</button>
              <input className={styles.quantity} type="num" value={0} />
              <button>+</button>
            </div>
            <button className={styles.buy}>Buy</button>
          </div>
        );
      })}
    </div>
  );
}
