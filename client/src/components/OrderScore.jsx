import React from "react";
import {useDispatch} from 'react-redux';
import { orderByScore } from "../actions/indexAction";

export default function OrderByScore({value,set}){
    const dispatch= useDispatch();

    function handlerFilterByScore(e){
        dispatch(orderByScore(e.target.value));
        
        set(`ordenado ${e.target.value}`)
    }

    return(
        <div>
            <label >Order By Score</label>
            <select  id="btn-order" onChange={(e)=> handlerFilterByScore(e)}>
                <option value="min" key={value}>Score Min</option>
                <option value="max" >Score Max</option>
            </select>
        </div>
    )
}