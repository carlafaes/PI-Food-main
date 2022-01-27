import { GET_RECIPES,GET_DIETS,GET_DETAILS,FILTER,ORDER } from "../actions/types";

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
        case ORDER:
            let orderState= state.recipes;
            console.log(orderState)
            let orderALf= action.payload === 'az' ? orderState.sort(function(a,b){
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return -1;
                }
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1
                }
                else{
                    return 0;
                }
            }).flat():
            orderState.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1;
                }
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                }
                else{
                    return 0;
                }
            }).flat()
            console.log(orderALf,'order alf')
            return{
                ...state,
                filtered:orderALf,
            }
        case GET_DETAILS:
            return{
                ...state,
                details: action.payload,
            }
        case GET_DIETS:
            return{
                ...state,
                diets:action.payload,
            }
            

        default:
            return{
                state,
            }
    }
    
}
