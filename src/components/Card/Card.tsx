import styles from "./Card.module.css";

type CardProps = {
  title: string;
  image: string;
  price: number;
};

export default function Card({ title, image, price }: CardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.itemTitle}>{title}</h2>
      <img className={styles.img} src={image} alt={title} />
      <h2 className={styles.itemPrice}>${price}</h2>
      <div>
        <button>-</button>
        <input className={styles.quantity} type="num" value={0} />
        <button>+</button>
      </div>
      <button className={styles.buy}>Buy</button>
    </div>
  );
}
