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
            <label className="label1">Order Alphabetic<br/></label>
            <select className="select1" id="btn-order" onChange={(e)=> handleSelect(e)}>
                <option className="option1" value="az">A-Z</option>
                <option className="option1" value="za">Z-A</option>
            </select>
        </div>
    )
}