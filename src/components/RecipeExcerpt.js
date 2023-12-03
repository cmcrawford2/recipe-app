import React from "react";
import { truncateText } from "../helpers/utils";

export default function RecipeExcerpt(props) {
  const { recipe, handleSelectRecipe } = props;
  const truncatedText = truncateText(recipe.description);

  return (
    <article className="recipe-card">
      <figure>
        <img src={recipe.image_url} alt={recipe.title} />
      </figure>
      <h2>{recipe.title}</h2>
      <p className="flex-spacing">{`Description: ${truncatedText}`}</p>
      <button onClick={() => handleSelectRecipe(recipe)}>View</button>
    </article>
  );
}
