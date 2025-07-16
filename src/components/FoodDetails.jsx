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
        <img className={styles.recipeImage} src={food.image} alt={food.title} />
        <div className={styles.recipeDetails}>
          <span>
            <strong>
              <span role="img" aria-label="cooking time">
                {String.fromCodePoint(0x1f559)}
              </span>
              {food.readyInMinutes} Minutes
            </strong>
          </span>
          <span>
            <span role="img" aria-label="number of servings">
              {String.fromCodePoint(0x1f46a)}
            </span>
            <strong>Serves {food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? (
                <>
                  <span role="img" aria-label="vegetarian food">
                    {String.fromCodePoint(0x1f955)}
                  </span>{" "}
                  Vegetarian
                </>
              ) : (
                <>
                  <span role="img" aria-label="non-vegetarian food">
                    {String.fromCodePoint(0x1f356)}
                  </span>{" "}
                  Non-Vegetarian
                </>
              )}
            </strong>
          </span>
          <span>
            <strong>
              {food.vegan ? (
                <>
                  <span role="img" aria-label="vegan food">
                    {String.fromCodePoint(0x1f404)}
                  </span>{" "}
                  Vegan
                </>
              ) : (
                ``
              )}
            </strong>
          </span>
        </div>
        <div>
          <span>
            <strong>${food.pricePerServing / 100} Per serving</strong>
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
