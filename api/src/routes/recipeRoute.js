const {Router}= require ('express');
const {allRecipes, postRecipes, idRecipes} = require ('../controllers/recipeController');


const recipesRouter = Router();

// todas las REQ que llegan a este archivo, es porque comienzan con lo siguiente:
// http:localhost:3001/recipe

recipesRouter.get('./getRecipes', allRecipes);
recipesRouter.post('./create',postRecipes);
recipesRouter.get('./:id',idRecipes);

module.exports= recipesRouter;