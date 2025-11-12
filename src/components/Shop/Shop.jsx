import { useEffect, useState } from "react";
import styles from "./Shop.module.css";
import ShopCard from "../ShopCard/ShopCard";
import { useOutletContext } from "react-router";

export default function Shop() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { itemList, setItemList } = useOutletContext();

  useEffect(() => {
    async function fetchItems() {
      if (itemList && itemList.length > 0) return;

      try {
        setIsLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch items");
        const data = await response.json();
        setItemList(data.filter((item) => item.category !== "electronics"));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems();
  }, [itemList, setItemList]);

  if (isLoading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <div className={styles.cardGrid}>
      {itemList.map((item) => {
        return (
          <ShopCard
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
          />
        );
      })}
    </div>
  );
}
