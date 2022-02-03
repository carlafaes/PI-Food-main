import React from "react";
import {useDispatch} from 'react-redux';
import { orderByDiets } from "../actions/indexAction";


export default function FilterByDiets({id}){
    const dispatch=useDispatch();

    function handlerFilterDiets(e){
        e.preventDefault();
        dispatch(orderByDiets(e.target.value));
        
    }
    

    return(
        <div>
            <label className="label1" >Filter By Diets</label>
            <select className="select1" id="btn-diets"  onChange={e => handlerFilterDiets(e)}>
            <option className="option1" value='diets' >All Diets</option>
            <option className="option1" value={'gluten free,dairy free'}   >Gluten Free</option>
            <option className="option1" value={'gluten free','dairy free'}>Dairy Free</option>
            <option className="option1" value= {"paleolithic","dairy free"} > Paleolithic</option>
            <option className="option1" value="ketogenic"> Ketogenic</option>
            <option className="option1" value="lacto ovo vegetarian"> Lacto ovo vegetarian</option>
            <option className="option1" value={"vegan",'gluten free'}> Vegan</option>
            <option className="option1" value={"pescatarian", 'gluten free'} > Pescatarian</option>
            <option className="option1" value={"primal","pescatarian"}> Primal</option>
            <option className="option1" value="fodmap friendly"> Fodmap friendly</option>
            <option className="option1" value= "whole 30" > Whole 30</option>
            </select>
        </div>
    )
}