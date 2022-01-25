import { GET_RECIPES } from "./types";
import axios from 'axios';

export const ROUT_GET_RECIPES = `http://localhost:3001/recipe/getRecipes`;
export const ROUT_GET_DIETS= `http://localhost:3001/diet/getDiets`;
console.log(ROUT_GET_RECIPES)

export function getRec(){
    console.log('entre al action fn')
    return async (dispatch) => {
        let infoGet = await axios.get(ROUT_GET_RECIPES);
        let inf= infoGet.data
        console.log(inf, 'este es el info de actions');
        return dispatch({
            type: GET_RECIPES,
            payload: inf,
            
        });
    }
}