import { GET_RECIPES,GET_DETAILS,GET_DIETS,ORDER,ORDER_BY_SCORE,ORDER_BY_DIETS,SEARCH_BY_NAME,ADD_CHAR,FILTER_CREATED,ORDER_BY_HEALTHSCORE } from "./types";
import axios from 'axios';

export const ROUT_GET_RECIPES = `/recipe/getRecipes`;
export const ROUT_GET_DIETS= `/diet/getDiets`;
console.log(ROUT_GET_RECIPES)

export function getRec(){
    console.log('entre al action fn')
    return async (dispatch) => {
        let infoGet = await axios.get(ROUT_GET_RECIPES);
        let inf= infoGet.data;
        let infoData=inf.flat()
        
        console.log(inf, 'este es el info de actions');
        return dispatch({
            type: GET_RECIPES,
            payload: infoData
            
        });
    }
}
export function getDetails(id){
    return async(dispatch)=>{
        const details2= await (await axios.get('/recipe/' + id)).data;
        console.log(details2,'details llamado axios')
        // const data= details2.data;
        // console.log('este es el data getdetail', data)
        return dispatch({
            type:GET_DETAILS,
            payload:details2,
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

export function orderByScore(value){
    return{
        type:ORDER_BY_SCORE,
        payload:value,
    }
}
export function orderByhealthScore(value){
    return{
        type:ORDER_BY_HEALTHSCORE,
        payload:value,
    }
}


export function orderByDiets(payload){
    return{
        type: ORDER_BY_DIETS,
        payload,
    }
}
export const searchByName=(name)=>{
    return async (dispatch)=>{
        try{
            const getName= await axios.get(`/recipe/getRecipes?name=${name}`);
            const searchName=getName.data.flat()
            console.log(searchName,'este es el search name')
            return dispatch({
                type:SEARCH_BY_NAME,
                payload:searchName
            })
        }
        catch(err){
            console.log(err,'error del searchByName,action')
        }
    }
}
export function addChar(payload){
    return async function(dispatch){
        const created= await axios.post('/recipe/create/',payload);
         console.log(created.data)
        return created.data;
    } 
}

export const addCharType = () => ({type: ADD_CHAR})

export function filterCreated(payload){
    return{
        type:FILTER_CREATED,
        payload
    }
}

