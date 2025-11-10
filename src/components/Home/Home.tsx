import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <img src="src/assets/shop.jpg" alt="" />
      <div>
        <h1>Welcome to Shop!</h1>
        <p>Use the navigation bar on top of the page.</p>
        <p>Visit us at:</p>
        <p>123, Fake Road, Fake Town</p>
        <p>Contact us:</p>
        <p>fake@fakemail.com</p>
      </div>
    </div>
  );
}
