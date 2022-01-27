import { GET_RECIPES,GET_DETAILS,GET_DIETS,ORDER,FILTER } from "./types";
import axios from 'axios';

export const ROUT_GET_RECIPES = `http://localhost:3001/recipe/getRecipes`;
export const ROUT_GET_DIETS= `http://localhost:3001/diet/getDiets`;
console.log(ROUT_GET_RECIPES)

export function getRec(){
    console.log('entre al action fn')
    return async (dispatch) => {
        let infoGet = await axios.get(ROUT_GET_RECIPES);
        let inf= infoGet.data;
        
        console.log(inf, 'este es el info de actions');
        return dispatch({
            type: GET_RECIPES,
            payload: inf
            
        });
    }
}
export function getDetails(id){
    return async(dispatch)=>{
        const details= await axios.get('http://localhost:3001/recipe/' + id);
        const data= details.data;
        console.log('este es el data detail', data)
        return dispatch({
            type:GET_DETAILS,
            payload:data,
        })
    }
}
export function getDiets(){
    return async(dispatch)=>{
        let infoDiets= await axios.get(ROUT_GET_DIETS);
        return dispatch({
            type:GET_DIETS,
            payload: infoDiets.data,
        })
    }
}

export function orderFil(value){
    return (dispatch)=>{
        dispatch({
            type: ORDER,
            payload:value
        
    })
  }
}
export function filter(value){
    return (dispatch)=>{
        dispatch({
            type:FILTER,
            payload: value,
        })
    }

}