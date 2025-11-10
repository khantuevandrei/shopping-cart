import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <img className={styles.img} src="src/assets/shop.jpg" alt="" />
      <div>
        <h1 className={styles.heading}>Welcome to Shop!</h1>
        <p className={styles.para}>
          Use the navigation bar on top of the page.
        </p>
        <p className={styles.para}>Visit us at:</p>
        <p className={styles.para}>123, Fake Road, Fake Town</p>
        <p className={styles.para}>Contact us:</p>
        <p className={styles.para}>fake@fakemail.com</p>
      </div>
    </div>
  );
}
