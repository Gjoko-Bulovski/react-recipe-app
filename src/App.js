import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  
  const APP_Id = '0966f169'; 
  const APP_KEY = 'aed3585854556a8de7c247e7418c8f92';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_Id}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => { 
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <h1>Recipe App</h1>
      <form onSubmit={getSearch} className="search-form">
        <input 
          className="search-bar" 
          type='text' 
          value={search} 
          onChange={updateSearch} 
        />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className='recipes'>
        {recipes.map((recipe, index) => (
          <Recipe 
            key={index}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
