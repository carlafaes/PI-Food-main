import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import { searchByName } from "../actions/indexAction";

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
                <div>
                    <input type="text" placeholder="Search recipe" value={search} onChange={onInputChange} />
                    <input type="submit" value='🔍' onSubmit={onSubmit} />
                </div>
            </form>
        </div>
    )
}