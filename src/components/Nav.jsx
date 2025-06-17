import styles from "./nav.module.css";
export default function Nav() {
  return (
    <div className={styles.nav}>{String.fromCodePoint(0x1f354)} FoodApp</div>
  );
}
