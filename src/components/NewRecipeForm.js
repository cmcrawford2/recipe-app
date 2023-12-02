import React from "react";
const NewRecipeForm = (props) => {
  const { newRecipe, hideRecipeForm, onUpdateForm } = props;
  return (
    <div className="recipe-details">
      <div className="recipe-form">
        <h2>New Recipe</h2>
        <button className="cancel-button" onClick={hideRecipeForm}>
          Cancel
        </button>

        <form>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newRecipe.title}
            onChange={(e) => onUpdateForm(e)}
            required
          />

          <label>Ingredients</label>
          <textarea
            name="ingredients"
            value={newRecipe.ingredients}
            onChange={(e) => onUpdateForm(e)}
            required
            placeholder="Add ingredients separated by commas - i.e. Flour, sugar, almonds"
          />

          <label>Instructions</label>
          <textarea
            name="instructions"
            value={newRecipe.instructions}
            onChange={(e) => onUpdateForm(e)}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={newRecipe.description}
            onChange={(e) => onUpdateForm(e)}
            required
          />

          <label>Image</label>
          <input
            type="text"
            name="image_url"
            value={newRecipe.image_url}
            onChange={(e) => onUpdateForm(e)}
            required
          />

          <label>Servings</label>
          <input
            type="number"
            name="servings"
            value={newRecipe.servings}
            onChange={(e) => onUpdateForm(e)}
            required
          />

          <button type="submit">Save Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default NewRecipeForm;

/*

Let’s take it out for a spin! Pass the onUpdateForm function to the NewRecipeForm component. In NewRecipeForm.js, destructure the onUpdateForm. In each of the inputs and text areas, make sure to provide a value that matches the corresponding state (for example value={newRecipe.ingredients} for the ‘ingredients’ textarea, and an accompanying onChange function – i.e. onChange={(e) => onUpdateForm(e)}. The great thing about our versatile onUpdateForm function is that you can pass the exact same onChange for each of your form fields – it’s just the value that changes.
Try pressing on the ‘New Recipe’ button in the browser – you should be able to enter all of the values. When you click on ‘Save’ – nothing much will happen right now (aside from a page refresh) – but we’ll address this behavior next!
*/
