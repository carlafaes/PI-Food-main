import React from "react";
import {useDispatch} from 'react-redux';
import { orderByScore,orderByhealthScore } from "../actions/indexAction";

export default function OrderByScore({value,set}){
    const dispatch= useDispatch();

    function handlerFilterByScore(e){
        dispatch(orderByScore(e.target.value));
        
        
        set(`ordenado ${e.target.value}`)
    }

    function orderByhealthScores(e){
        
        dispatch(orderByhealthScore(e.target.value))
        
        set(`ordenado ${e.target.value}`)
    }
    return(
        <div>
        <div>
            <label className="label1">Order By Score<br/></label>
            <select className="select1"  id="btn-order" onChange={(e)=> handlerFilterByScore(e)}>
                <option className="option1" value="min" key={value}>Score Min</option>
                <option className="option1" value="max" >Score Max</option>
            </select>
        </div>
        <br/>
        <div>
            <label className="label1" >Order By Health Score</label>
            <select className="select1" onChange={(e)=>orderByhealthScores(e)}>
                <option className="option1" value="min"> HealthScore min</option>
                <option className="option1" value="max"> HealthScore max</option>
            </select>
        </div>
        </div>
    )
}