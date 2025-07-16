import { API_KEY } from "../env.js";
import { useState } from "react";
import styles from "./search.module.css";
const URL = "https://api.spoonacular.com/recipes/complexSearch";

let timer;

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza");
  const processChange = (e) => {
    setQuery(e);
    clearTimeout(timer);
    timer = setTimeout(() => {
      fetchFood();
    }, 1000);
  };

  async function fetchFood() {
    const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    setFoodData(data.results);
  }

  return (
    <div className={styles.searchContainer}>
      <label htmlFor="search-input" className={styles.visuallyHidden}>
        Search for a recipe
      </label>
      <input
        id="search-input"
        className={styles.input}
        value={query}
        onChange={(e) => processChange(e.target.value)}
        type="text"
      />
    </div>
  );
}
