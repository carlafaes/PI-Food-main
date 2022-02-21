import { GET_RECIPES,GET_DIETS,GET_DETAILS,ORDER,ORDER_BY_SCORE,ORDER_BY_DIETS,SEARCH_BY_NAME,ADD_CHAR,FILTER_CREATED,ORDER_BY_HEALTHSCORE } from "../actions/types";

const initialState={
    recipes:[],
    filtered:[],
    details:{},
    diets:[],
}


export default function rootReducer(state= initialState,action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                filtered:action.payload,//cargo todas las recetas tambien en ese estado para que luego filtre sobre la cantidad completa de recetas
                // diets:action.payload
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
        case ORDER_BY_SCORE:
            const stateScore=state.filtered;
            console.log(stateScore)
            if(action.payload === 'min'){
                 const scoreAsc = (a, b) => 
                 Number(a.score) - 
                 Number(b.score) 
                 stateScore.sort(scoreAsc)

            }
            if(action.payload === 'max'){
                const scoreDsc = (a, b) => 
                Number(b.score) - 
                Number(a.score) 
                stateScore.sort(scoreDsc)
            }
            return{
                ...state,
               filtered:stateScore
            }  

            case ORDER_BY_HEALTHSCORE:
            const stateHealthScore=state.filtered;
            console.log(stateHealthScore)
            if(action.payload === 'min'){
                 const hscoreAsc = (a, b) => 
                 Number(a.healthScore) - 
                 Number(b.healthScore) 
                 stateHealthScore.sort(hscoreAsc)

            }
            if(action.payload === 'max'){
                const hscoreDsc = (a, b) => 
                Number(b.healthScore) - 
                Number(a.healthScore) 
                stateHealthScore.sort(hscoreDsc)
            }
            return{
                ...state,
               filtered:stateHealthScore
            }  
        case ORDER_BY_DIETS:
            const allDiets= state.recipes;
            let filterDiets=[]
             if(action.payload === 'diets'){
                 filterDiets= allDiets;
            }
            else{
                filterDiets= allDiets.filter(el => el.diets.find(e =>{
                         if(e.name === action.payload){
                             return el;
                         }
                     }))
            }
            console.log(allDiets,'allDiets')
            console.log(filterDiets,'filterDiets')

            return{
                ...state,
                filtered:filterDiets
            } 
         case SEARCH_BY_NAME:
                return {
                  ...state,
                  filtered: action.payload,
                };
         case ADD_CHAR:
            return{
                ...state,
                    }
        case FILTER_CREATED:
        const createdFilter= action.payload === 'created' ?
        state.recipes.filter((el)=> el.createdInDb) :
        state.recipes.filter((el)=> !el.createdInDb);
        const allRec= action.payload === 'all'? state.recipes : createdFilter;
        console.log(allRec,'allRec')
        return{
            ...state,
            filtered:allRec
        }  
            

        default:
            return{
                state,
            }
    }
    
}
