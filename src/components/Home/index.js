import React from 'react';
import { withAuthorization } from "../Session";
import AddRecipeForm from '../AddRecipe';

const Home = () => (
  <div>
    <h1>Home</h1>
    <AddRecipeForm />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);