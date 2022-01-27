import React from "react";
import { useDispatch } from "react-redux";
import { orderFil } from "../actions/indexAction";

export default function Order({set}){
    const dispatch= useDispatch();

    function handleSelect(e){
        e.preventDefault();
        dispatch(orderFil(e.target.value));
        set(`${e.target.value}`)
    }
    return(
        <div>
            <label >Order</label>
            <select id="btn-order" onChange={(e)=> handleSelect(e)}>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
            </select>
        </div>
    )
}