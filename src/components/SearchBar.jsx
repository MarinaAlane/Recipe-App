import React, { useState } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { searchBarFetch } from '../actions/searchBar';
import '../Style/SearchBar.css';

function SearchBar({ page, setRecipes }) {
  const [search, setSearch] = useState({ searchValue: '', query: '', page });

  const handleChange = ({ target: { value, name } }) => {
    setSearch({ ...search, [name]: value });
  };

  const handleClick = () => {
    if (search.query === 'f' && search.searchValue.length > 1) {
      window.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      setRecipes(search);
    }
  };

  return (
    <div className="searchBar">
      <div className="radiosSearchBar">
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            name="query"
            value="i"
            onChange={ handleChange }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            data-testid="name-search-radio"
            name="query"
            value="s"
            onChange={ handleChange }
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            id="firstLetter"
            data-testid="first-letter-search-radio"
            name="query"
            value="f"
            onChange={ handleChange }
          />
          Primeira Letra
        </label>
      </div>
      <div className="search">
        <input
          type="text"
          data-testid="search-input"
          placeholder="Buscar receita"
          name="searchValue"
          onChange={ handleChange }
          className="inputSearch"
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Procurar
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setRecipes: (search) => dispatch(searchBarFetch(search)),
});

SearchBar.propTypes = {
  page: string,
}.isRequired;

export default connect(null, mapDispatchToProps)(SearchBar);
