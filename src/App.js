import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import RecipeExcerpt from "./components/RecipeExcerpt";
import RecipeFull from "./components/RecipeFull";
import NewRecipeForm from "./components/NewRecipeForm";
import displayToast from "./helpers/toastHelper";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
          displayToast("Could not fetch recipes!", "error");
        }
      } catch (e) {
        console.error("An error occurred during the request:", e);
        displayToast(
          "An unexpected error occurred. Please try again later.",
          "error"
        );
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

        displayToast("Recipe added successfully!", "success");

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
        displayToast("Could not fetch recipes!", "error");
      }
    } catch (error) {
      console.error("An error occurred during the request:", error);
      displayToast(
        "An unexpected error occurred. Please try again later.",
        "error"
      );
    }
  };

  const handleUpdateRecipe = async (e, selectedRecipe) => {
    e.preventDefault();

    const { id } = selectedRecipe;

    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedRecipe),
      });

      if (response.ok) {
        const data = await response.json();

        setRecipes(
          recipes.map((recipe) => {
            if (recipe.id === id) return data.recipe;
            else return recipe;
          })
        );

        displayToast("Recipe updated successfully!", "success");

        setSelectedRecipe(null);
      } else {
        displayToast("Could not fetch recipes!", "error");
      }
    } catch (error) {
      console.error("An error occurred during the request:", error);
      displayToast(
        "An unexpected error occurred. Please try again later.",
        "error"
      );
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      console.log(recipeId, selectedRecipe.id);
      const response = await fetch(`/api/recipes/${selectedRecipe.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));

        displayToast("Recipe deleted successfully!", "success");

        setSelectedRecipe(null);
      } else {
        displayToast("Could not fetch recipes!", "error");
      }
    } catch (error) {
      console.error("An error occured during the request:", error);
      displayToast(
        "An unexpected error occurred. Please try again later.",
        "error"
      );
    }
  };

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const searchResults = recipes.filter((recipe) => {
      const splitIngredients = [...recipe.ingredients.split(",")].join();
      const valuesToSearch = [
        ...recipe.title.split(" "),
        ...recipe.description.split(" "),
        ...splitIngredients.split(" "),
      ];
      const result = valuesToSearch.some(
        (value) => value.toLowerCase() === lowerCaseSearchTerm
      );
      return result;
    });
    return searchResults;
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

  const onUpdateForm = (e, action = "new") => {
    const { name, value } = e.target;
    if (action === "new") {
      setNewRecipe({ ...newRecipe, [name]: value });
    } else {
      // action === "update"
      setSelectedRecipe({ ...selectedRecipe, [name]: value });
    }
  };

  const updateSearchTerm = (text) => {
    setSearchTerm(text);
  };

  const displayAllRecipes = () => {
    setSearchTerm("");
    setSelectedRecipe(null);
    setShowNewRecipeForm(false);
  };

  const displayedRecipes = searchTerm ? handleSearch() : recipes;

  return (
    <div className="recipe-app">
      <Header
        showRecipeForm={showRecipeForm}
        searchTerm={searchTerm}
        updateSearchTerm={updateSearchTerm}
        displayAllRecipes={displayAllRecipes}
      />
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
          onUpdateForm={onUpdateForm}
          handleUpdateRecipe={handleUpdateRecipe}
          handleDeleteRecipe={handleDeleteRecipe}
        />
      ) : (
        <div className="recipe-list">
          {displayedRecipes.map((recipe) => {
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
      <ToastContainer />
    </div>
  );
}

export default App;
