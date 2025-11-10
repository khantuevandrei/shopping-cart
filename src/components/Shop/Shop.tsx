import { useEffect, useState } from "react";
import styles from "./Shop.module.css";
import Card from "../Card/Card";

export default function Shop() {
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        setIsLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch items");
        const data = await response.json();
        setItemList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems();
  }, []);

  if (isLoading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <div className={styles.cardGrid}>
      {itemList.map((item) => {
        return (
          <Card
            key={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
          />
        );
      })}
    </div>
  );
}
