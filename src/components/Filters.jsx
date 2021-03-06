import React, { useState } from 'react';
import { arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import { filteredFetch } from '../actions/filterList';
import { searchBarFetch } from '../actions/searchBar';
import '../Style/Filters.css';

function Filters({ filters, path, setFiltered, setRecipes }) {
  const [buttons, setButtons] = useState({});
  if (!filters) return <> </>;

  const type = path === '/bebidas' ? 'Bebidas' : 'Comidas';

  const handleClick = (name, category) => {
    if (!buttons[name]) {
      setButtons({ [name]: true });
      setFiltered(category, path);
    } else {
      setButtons({});
      setRecipes({ searchValue: '', query: 's', page: type });
    }
  };

  const FILTER_LIMIT = 5;

  return (
    <div className="filterList">
      <button
        variant="outline-dark"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setRecipes({ searchValue: '', query: 's', page: type }) }
        className="filters-btn"
      >
        All
      </button>
      { filters.map(({ strCategory }, index) => index < FILTER_LIMIT && (
        <button
          variant="outline-dark"
          type="button"
          className="filters-btn"
          key={ strCategory }
          name={ strCategory }
          onClick={ ({ target }) => handleClick(target.name, strCategory) }
          data-testid={ `${strCategory}-category-filter` }
        >
          { strCategory }
        </button>
      )) }
    </div>
  );
}

const mapStateToProps = (state) => ({
  filters: state.setFilters.filtersList,
});

const mapDispatchToProps = (dispatch) => ({
  setFiltered: (filter, path) => dispatch(filteredFetch(filter, path)),
  setRecipes: (obj) => dispatch(searchBarFetch(obj)),
});

Filters.propTypes = {
  filters: arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
