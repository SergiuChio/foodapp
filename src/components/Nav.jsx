import styles from "./nav.module.css";
export default function Nav() {
  return (
    <div className={styles.nav}>
      <span role="img" aria-label="hamburger menu">
        {String.fromCodePoint(0x1f354)}
      </span>{" "}
      FoodApp
    </div>
  );
}
