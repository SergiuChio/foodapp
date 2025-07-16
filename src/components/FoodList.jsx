import FoodItem from "./FoodItem";
import styles from "./foodlist.module.css";

export default function FoodList({ foodData, setFoodId }) {
  return (
    <ul className={styles.foodList}>
      {foodData.map((food) => (
        <li key={food.id}>
          <FoodItem food={food} setFoodId={setFoodId} />
        </li>
      ))}
    </ul>
  );
}
