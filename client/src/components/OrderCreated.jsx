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
    <select onChange={e => handlerFilterCreated(e)}>
        <option value="all">All</option>
        <option value="created">Created</option>
        <option value="api">Api</option>
    </select>
)
}

