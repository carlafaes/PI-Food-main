import React from "react";
import {useDispatch} from 'react-redux';
import { filterCreated } from "../actions/indexAction";

export default function OrderCreated({set}){
const dispatch= useDispatch();

function handlerFilterCreated(e){
    dispatch(filterCreated(e.target.value));
    set(`ordenado ${e.target.value}`)
}

return(
    <div>
            <label className="label1">Order Info<br/> </label>
            <select className="select1" onChange={e => handlerFilterCreated(e)}>
                <option className="option1" value="all">All</option>
                <option className="option1" value="created">Created</option>
                <option className="option1" value="api">Api</option>
            </select>
    </div>
    
)
}

