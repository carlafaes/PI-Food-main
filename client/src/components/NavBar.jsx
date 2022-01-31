import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRec } from "../actions/indexAction";
import './styles/Navbar.css';


export default function Navbar(){
    const dispatch= useDispatch();

    function handleClick(e){
        e.preventDefault();
        dispatch(getRec());
    }

    return(
        <div className='navbar'>
            <div onClick={handleClick}>
                <Link to='/home'>
                <ul>
                    <li value='home' className="lista">Home</li>
                </ul>
                </Link>
            </div>
            <div>
                <Link to='/create'>
                <ul>
                    <li value='createRec' className="lista" >Create</li>
                </ul>
                </Link>
            </div>
        </div>
    )
}