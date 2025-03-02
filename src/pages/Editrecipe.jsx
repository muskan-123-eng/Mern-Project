import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChanaMasala from '../images/Chana Masala.jpg';
import PavBhaji from '../images/Pav Bhaji.jpg';
import PuranPoli from '../images/Puran Poli.jpg';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    image: "",
  });
  const [review, setReview] = useState("");

  // Populate recipes
  useEffect(() => {
    setRecipes([
  
    
      { id: 2, name: "Pav Bhaji", image: PavBhaji, time: "35 min", likes: 0, reviews: [] },
      { id: 3, name: "Chana Masala", image: ChanaMasala, time: "30 min", likes: 0, reviews: [] },
      { id: 4, name: "Puran Poli", image: PuranPoli, time: "50 min", likes: 0, reviews: [] },
      
    ]);
  }, []);

  // Handle search term
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle new recipe submission
  const handleNewRecipeChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();
    if (!newRecipe.name || !newRecipe.description || !newRecipe.ingredients || !newRecipe.image) {
      alert("Please fill all fields!");
      return;
    }

    const newRecipeData = {
      id: recipes.length + 1,
      name: newRecipe.name,
      description: newRecipe.description,
      ingredients: newRecipe.ingredients.split(","),
      image: newRecipe.image,
      time: "30 min", // Default time
      likes: 0,
      reviews: [],
    };

    setRecipes([...recipes, newRecipeData]);
    setNewRecipe({ name: "", description: "", ingredients: "", image: "" });
  };

  // Handle like functionality
  const handleLike = (id) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, likes: recipe.likes + 1 } : recipe
      )
    );
  };

  // Handle recipe deletion
  const handleDelete = (id) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
  };

  // Handle adding reviews
  const handleAddReview = (id, reviewText) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, reviews: [...recipe.reviews, reviewText] }
          : recipe
      )
    );
    setReview(""); // Reset review input after submitting
  };

  return (
    <div className="home-container">
      <style>
        {`
          .home-container {
            font-family: Arial, sans-serif;
            padding: 20px;
          }

          .hero-section {
            text-align: center;
            margin-bottom: 30px;
          }

          .search-bar {
            text-align: center;
            margin-bottom: 20px;
          }

          .recipe-cards {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
          }

          .recipe-card {
            border: 1px solid #ddd;
            padding: 15px;
            width: 200px;
            text-align: center;
          }

          .recipe-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: space-between;
          }

          .recipe-actions button {
            width: 48%; /* To allow two buttons per line */
            padding: 5px 10px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 4px;
          }

          .recipe-actions button:hover {
            background-color: #0056b3;
          }

          .review-section {
            margin-top: 20px;
          }

          .review-btn {
            padding: 5px 10px;
            margin-top: 10px;
            background-color: #28a745;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 4px;
          }

          .review-btn:hover {
            background-color: #218838;
          }

          .form-input {
            width: 100%;
            padding: 8px;
            margin: 10px 0;
            border: 1px solid #ddd;
          }

          .submit-btn {
            padding: 10px 20px;
            background-color: #28a745;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 4px;
          }

          .browse-btn {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 4px;
          }

          .submit-btn:hover, .browse-btn:hover {
            background-color: #0056b3;
          }

          .add-recipe-form {
            margin-bottom: 30px;
          }

          .add-recipe-form h3 {
            text-align: center;
            margin-bottom: 20px;
          }

          .recipe-form input {
            width: 100%;
            padding: 8px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
          }

          .recipe-form button {
            width: 100%;
            padding: 10px 20px;
            background-color: #28a745;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 4px;
          }
        `}
      </style>

      <Header />
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <h2>Explore Delicious Recipes 🍜</h2>
        <p>Find easy, quick, and tasty recipes curated just for you.</p>
        <button className="browse-btn">Browse Recipes</button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Add Recipe Form */}
      <div className="add-recipe-form">
        <h3>Add a New Recipe</h3>
        <form onSubmit={handleAddRecipe} className="recipe-form">
          <input
            type="text"
            name="name"
            value={newRecipe.name}
            onChange={handleNewRecipeChange}
            placeholder="Recipe Name"
            className="form-input"
            required
          />
          <input
            type="text"
            name="description"
            value={newRecipe.description}
            onChange={handleNewRecipeChange}
            placeholder="Description"
            className="form-input"
            required
          />
          <input
            type="text"
            name="ingredients"
            value={newRecipe.ingredients}
            onChange={handleNewRecipeChange}
            placeholder="Ingredients (comma-separated)"
            className="form-input"
            required
          />
          <input
            type="text"
            name="image"
            value={newRecipe.image}
            onChange={handleNewRecipeChange}
            placeholder="Image URL"
            className="form-input"
            required
          />
          <button type="submit" className="submit-btn">Add Recipe</button>
        </form>
      </div>

      {/* Recipe Cards Section */}
      <div className="recipe-cards">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="recipe-img"
                onError={(e) => (e.target.src = "/images/default.png")} // Fallback image
              />
              <h3>{recipe.name}</h3>
              <p>⏳ {recipe.time}</p>
              <p>👍 {recipe.likes} Likes</p>

              <div className="recipe-actions">
                <button onClick={() => handleLike(recipe.id)} className="like-btn">Like</button>
                <br></br>
                <button onClick={() => handleDelete(recipe.id)} className="delete-btn">Delete</button>
                <br></br>
                <Link to={`/edit/${recipe.id}`} className="edit-btn">Edit</Link>
                <Link to={`/recipe/${recipe.id}`} className="view-btn">View Recipe</Link>
              </div>

              {/* Review Section */}
              <div className="review-section">
                <h4>Reviews</h4>
                {recipe.reviews.length > 0 ? (
                  <ul>
                    {recipe.reviews.map((review, index) => (
                      <li key={index}>{review}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No reviews yet.</p>
                )}
                <input
                  type="text"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Add a review"
                  className="form-input"
                />
                <button
                  onClick={() => handleAddReview(recipe.id, review)}
                  className="review-btn"
                >
                  Add Review
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
