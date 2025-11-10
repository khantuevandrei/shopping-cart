import { useEffect, useState } from "react";
import styles from "./Shop.module.css";

export default function Shop() {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setItemList(data);
    }

    fetchItems();
  }, []);

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
