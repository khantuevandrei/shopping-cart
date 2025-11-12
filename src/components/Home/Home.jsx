import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>Welcome to Tote</h1>
        <p className={styles.para}>
          A long history of handmade jewelry & clothing.
        </p>
        <p className={styles.para}>
          We take pride in the quality of our goods.
        </p>
      </div>
    </div>
  );
}
