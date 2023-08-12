import React, { useState } from 'react';

function Search() {
  const [searchInput, setSearchInput] = useState('');
  const [recipeData, setRecipeData] = useState(null);

  const apiKey = '' // add Api key here;
  const apiHost = 'recipe-by-api-ninjas.p.rapidapi.com';
  const apiUrl = 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=';

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    
    const searchUrl = apiUrl + encodeURIComponent(searchInput.trim());

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
    };

    try {
      const response = await fetch(searchUrl, options);
      const result = await response.json();
      setRecipeData(result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Recipe Search</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {recipeData && (
        <div className='container-fluid'> 
          <h2>Found Recipe</h2>
          <p>{recipeData.title}</p>
          <h2>Ingredients</h2>
          <p>{recipeData.ingredients}</p>
          <p>{recipeData.servings}</p>
          <h2>Instructions</h2>
          <p>{recipeData.instructions}</p>
        </div>
      )}
    </div>
  );
}

export default Search;
