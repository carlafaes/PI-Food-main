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
            <div>
            <div className="title_food">Food App</div>
            </div>
            <div onClick={handleClick}>
                <Link to='/home'>
                <ul className="ul">
                    <li value='home' className="lista" id='home'>Home</li>
                </ul>
                </Link>
            </div>
            
            <div>
                <Link to='/create'>
                <ul className="ul">
                    <li value='createRec' className="lista" id='create' >Create</li>
                </ul>
                </Link>
            </div>
        </div>
    )
}