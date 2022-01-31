import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import { searchByName } from "../actions/indexAction";
import './styles/SearchBar.css';

export default function SearchBar(){
    const [search,setSearch]= useState('');
    console.log(search)
    const dispatch= useDispatch();

    function onSubmit(e){
        e.preventDefault(e);
        dispatch(searchByName(search));
        setSearch('');
    }
    function onInputChange(e){
        e.preventDefault();
        setSearch(e.target.value);
    }

    return(
        <div>
    
            <form onSubmit={onSubmit}>
            <div className="contSearch">
                <input className="search" type="text" placeholder="Search recipe" value={search} onChange={onInputChange} />
                <input className="submit" type="submit" value='🔍' onSubmit={onSubmit} />
            </div>
        </form>
            
        </div>
    )
}