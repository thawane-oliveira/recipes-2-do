import { Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import './App.css';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" />
      <Route exact path="/meals" component={ Meals } />
      <Route path="/drinks" component={ Drinks } />
      <Route exact path="/meals/:id-da-receita" />
      <Route exact path="/drinks/:id-da-receita" />
      <Route exact path="/meals/:id-da-receita/in-progress" />
      <Route exact path="/drinks/:id-da-receita/in-progress" />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </BrowserRouter>
  );
}

export default App;
