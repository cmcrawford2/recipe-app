import React from "react";

export default function RecipeExcerpt({ title, description, image_url }) {
  return (
    <article className="recipe-card">
      <figure>
        <img src={image_url} alt={`Picture of ${title}`} />
      </figure>
      <h2>{title}</h2>
      <p className="flex-spacing">{`Description: ${description}`}</p>
      <button>View</button>
    </article>
  );
}
/*
Once you’re good there, pop back into the RecipeExcerpt component and fill out the remaining pieces. Destructure the recipe prop. You’ll want an image inside the figure element, and you’ll need to provide the src and the alt attributes. You’ll want the title inside the h2 element. The paragraph should begin with “Description: ” and then you’ll want to… provide the description. 😀 The final piece is to add “View” as the button’s text.

recipe.title = data['title']
recipe.ingredients = data['ingredients']
recipe.instructions = data['instructions']
recipe.servings = data['servings']
recipe.description = data['description']
recipe.image_url = data['image_url']*/
