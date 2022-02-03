import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './styles/Card.css';

export default function Card({name,image,diets,id}){
    
    
    // //console.log(name,diets)
    return(
        <div  className="card1">
           
            <div  className="card-side front">
                <img className="img-card"  src={image} alt="imgCard" />
            </div>
            <div className="card-side back">
            <div>
                <h1 className="text-1">Name: {name}</h1>
            </div>
                <h2 className="text-1">Diets: {diets}</h2>
            </div>
            <div>
                <Link to={`/home/${id}`}>
                    <button className="btn-card1">
                        INFO
                    </button>
                </Link>
            </div>
        </div>
    )
}