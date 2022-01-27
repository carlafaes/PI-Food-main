import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRec } from "../actions/indexAction";


export default function Navbar(){
    const dispatch= useDispatch();

    function handleClick(e){
        e.preventDefault();
        dispatch(getRec());
    }

    return(
        <div>
            <div onClick={handleClick}>
                <Link to='/home'>
                <ul>
                    <li value='home'>Home</li>
                </ul>
                </Link>
            </div>
            <div>
                <Link to='/create'>
                <ul>
                    <li value='createRec'>Create</li>
                </ul>
                </Link>
            </div>
        </div>
    )
}