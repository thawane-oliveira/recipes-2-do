import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import './styles/MerryGoRound.css';

// Verificado sobre Carousel do bootstrap em: https://blog.betrybe.com/react/react-carousel/ e em: https://stackoverflow.com/questions/59205796/how-do-i-loop-react-bootstrap-carousel-items

function MerryGoRound() {
  const history = useHistory();
  const local = history.location.pathname;
  const { recommend } = useContext(AppContext);

  return (
    <Carousel style={ { margin: 10 } }>

      { local.includes('meals') ? (
        recommend.map((item, index) => (

          <Carousel.Item key={ index } data-testid={ `${index}-recommendation-card` }>
            <img
              className="merryImg"
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
            />
            <Carousel.Caption data-testid={ `${index}-recommendation-title` }>
              {item.strDrink}
            </Carousel.Caption>
          </Carousel.Item>

        ))) : (
        recommend.map((item, index) => (

          <Carousel.Item key={ index } data-testid={ `${index}-recommendation-card` }>
            <img
              className="merryImg"
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
            <Carousel.Caption
              data-testid={ `${index}-recommendation-title` }
            >
              <b>{item.strMeal}</b>
            </Carousel.Caption>
          </Carousel.Item>

        )))}
    </Carousel>

  );
}

export default MerryGoRound;
