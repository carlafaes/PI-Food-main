import { GET_RECIPES } from "../actions/types";

const initialState={
    recipes:[],
    filtered:[],
    details:[],
    diets:[],
}


export default function rootReducer(state= initialState,action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                filtered:action.payload,//cargo todas las recetas tambien en ese estado para que luego filtre sobre la cantidad completa de recetas
               
            }
            

        default:
            return{
                state,
            }
    }
    
}
