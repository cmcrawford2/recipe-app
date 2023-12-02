import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import RecipeExcerpt from "./components/RecipeExcerpt";
import RecipeFull from "./components/RecipeFull";
import NewRecipeForm from "./components/NewRecipeForm";

import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    servings: 1,
    description: "",
    image_url:
      "https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  });

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await fetch("/api/recipes");
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.log("Could not fetch recipes at start!");
        }
      } catch (e) {
        console.error("An error occurred during the request:", e);
        console.log("An unexpected error occurred. Please try again later.");
      }
    };
    fetchAllRecipes();
  }, []);

  const handleNewRecipe = async (e, newFormRecipe) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormRecipe),
      });

      if (response.ok) {
        const data = await response.json();

        setRecipes([...recipes, data.recipe]);

        console.log("Recipe added successfully!");

        setShowNewRecipeForm(false);
        setNewRecipe({
          title: "",
          ingredients: "",
          instructions: "",
          servings: 1,
          description: "",
          image_url:
            "https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        });
      } else {
        console.log("Could not fetch recipes!");
      }
    } catch (error) {
      console.error("An error occurred during the request:", error);
      console.log("An unexpected error occurred. Please try again later.");
    }
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleUnselectRecipe = () => {
    setSelectedRecipe(null);
  };

  const hideRecipeForm = () => {
    setShowNewRecipeForm(false);
  };

  const showRecipeForm = () => {
    setShowNewRecipeForm(true);
    setSelectedRecipe(null);
  };

  const onUpdateForm = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  return (
    <div className="recipe-app">
      <Header showRecipeForm={showRecipeForm} />
      {showNewRecipeForm ? (
        <NewRecipeForm
          newRecipe={newRecipe}
          hideRecipeForm={hideRecipeForm}
          onUpdateForm={onUpdateForm}
          handleNewRecipe={handleNewRecipe}
        />
      ) : selectedRecipe ? (
        <RecipeFull
          selectedRecipe={selectedRecipe}
          handleUnselectRecipe={handleUnselectRecipe}
        />
      ) : (
        <div className="recipe-list">
          {recipes.map((recipe) => {
            return (
              <RecipeExcerpt
                key={recipe.id}
                recipe={recipe}
                handleSelectRecipe={handleSelectRecipe}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
