import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Card({name,image,diets,id}){
    
    
    // //console.log(name,diets)
    return(
        <div>
            <div>
                <h1>Name: {name}</h1>
            </div>
            <div>
                <img src={image} alt="imgCard" />
            </div>
            <div>
                <h2>Diets: {diets}</h2>
            </div>
            <div>
                <Link to={`/home/${id}`}>
                    <button>
                        INFO
                    </button>
                </Link>
            </div>
        </div>
    )
}