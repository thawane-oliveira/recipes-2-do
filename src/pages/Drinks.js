import { useContext } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Drinks() {
  const {
    recipes,
  } = useContext(AppContext);
  const magicNumber = 12;

  return (
    <div>
      <Header headerText="Drinks" enableSearchButton />

      {
        recipes.filter((_item, index) => index < magicNumber)
          .map((recipe, index) => (
            <div key={ recipe.strDrink }>
              <h3
                data-testid={ `${index}-card-name` }
              >
                {recipe.strDrink}
              </h3>
              <img
                src={ recipe.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt={ recipe.strDrink }
              />
              <p data-testid={ `${index}-recipe-card` }>x</p>
            </div>
          ))
      }
    </div>
  );
}

export default Drinks;
