import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
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
    </AppProvider>
  );
}

export default App;
