import { API_KEY } from "../env.js";
import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  useEffect(() => {
    async function fetchRecipeDetails() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      setFood(data);
      setIsLoading(false);
    }
    if (foodId) {
      fetchRecipeDetails();
    }
  }, [foodId]);
  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>
              {String.fromCodePoint(0x1f559)}
              {food.readyInMinutes} Minutes
            </strong>
          </span>
          <span>
            {String.fromCodePoint(0x1f46a)}
            <strong>Serves {food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian
                ? `${String.fromCodePoint(0x1f955)} Vegetarian`
                : `${String.fromCodePoint(0x1f356)} Non-Vegetarian`}
            </strong>
          </span>
          <span>
            <strong>
              {food.vegan ? `${String.fromCodePoint(0x1f404)} Vegan` : ``}
            </strong>
          </span>
        </div>
        <div>
          $
          <span>
            <strong>{food.pricePerServing / 100} Per serving</strong>
          </span>
        </div>
        <div>
          <h2>Ingredients</h2>
          <ItemList food={food} isLoading={isLoading} />
          <h2>Instructions</h2>
          <div className={styles.recipeInstructions}>
            <ol>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                food.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number}>{step.step}</li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
