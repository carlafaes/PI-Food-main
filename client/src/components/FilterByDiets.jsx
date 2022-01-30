import React from "react";
import {useDispatch} from 'react-redux';
import { orderByDiets } from "../actions/indexAction";


export default function FilterByDiets(){
    const dispatch=useDispatch();

    function handlerFilterDiets(e){
        e.preventDefault();
        dispatch(orderByDiets(e.target.value));
        
    }

    return(
        <div>
            <label >Filter By Diets</label>
            <select id="btn-diets"  onChange={e => handlerFilterDiets(e)}>
            <option value='diets' >All Diets</option>
            <option value='gluten free'>Gluten Free</option>
            <option value='dairy free'>Dairy Free</option>
            <option value="paleolithic"> Paleolithic</option>
            <option value="ketogenic"> Ketogenic</option>
            <option value="lacto ovo vegetarian"> Lacto ovo vegetarian</option>
            <option value="vegan"> Vegan</option>
            <option value="pescatarian"> Pescatarian</option>
            <option value="primal"> Primal</option>
            <option value="fodmap friendly"> Fodmap friendly</option>
            <option value="whole 30"> Whole 30</option>
            </select>
        </div>
    )
}