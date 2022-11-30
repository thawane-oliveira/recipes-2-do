import { useContext } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Meals() {
  const {
    recipes,
  } = useContext(AppContext);
  const magicNumber = 12;

  return (
    <div>
      <Header headerText="Meals" enableSearchButton />
      {
        recipes.filter((_item, index) => index < magicNumber)
          .map((recipe, index) => (
            <div key={ recipe.strMeal }>
              <h3
                data-testid={ `${index}-card-name` }
              >
                {recipe.strMeal}
              </h3>
              <img
                src={ recipe.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt={ recipe.strMeal }
              />
              <p data-testid={ `${index}-recipe-card` }>x</p>
            </div>
          ))
      }
    </div>
  );
}

export default Meals;
