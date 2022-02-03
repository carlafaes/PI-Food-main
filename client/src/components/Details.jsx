import React from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getDetails } from "../actions/indexAction";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import imgRecipe from './img/descarga.jpeg'
import Navbar from "./NavBar";
import './styles/Details.css';

export default function Details(){
    const dispatch= useDispatch();
    const {id}= useParams();
    const recipes= useSelector((state)=> state.details);
    console.log(recipes,'este es el recipes')

    useEffect(()=>{
        dispatch(getDetails(id))
        
    },[dispatch,id])
    
    
    const styles={
        width:'100%'
    }

    return(
        <div className='fondo2'>
            
            <div className='navbar-details'>
            <Navbar />
            </div>

            <div className="fondo-detail" >
                
                    {recipes && Object.keys(recipes).length > 0  ?
                <>
                    <h1 className="title1">Name: {recipes.title? recipes.title : recipes[0].name} </h1>

                    <h3  className="score">Score: {recipes.spoonacularScore ? recipes.spoonacularScore : recipes[0].score}</h3>

                    <h3 className="score">HealthScore:{recipes.healthScore? recipes.healthScore : recipes[0].healthScore }</h3>

                    <img className="img-details" src={recipes.image? recipes.image : imgRecipe} alt="imageRecipe" />
                    <h3 className="texto1">Summary: {recipes.summary? <div dangerouslySetInnerHTML={{ __html: recipes.summary}}/> : recipes[0].summary} </h3>
                   
                   <div className="texto2">
                    <h3 >Steps:{recipes.analyzedInstructions? 
                    recipes.analyzedInstructions.map((e)=> e.steps.map((e)=> 
                    <ul className="lista-details" key={Math.random(id)}>
                     <li className="lista-details" >{e.step}</li>
                    </ul>)) :
                     recipes[0].steps}
                    </h3>
                    <h3 className="diet_1">Diets: {recipes.diets?recipes.diets.map((e)=> e +',') : recipes[0].diets[0].name}</h3>
                    </div>
                </>
                :
                 <div>
                     <div className="progress-bar orange stripes shine">
                        <span style={styles} className="loading">Loading...</span>
                    </div>
                </div>    
                }
                
           </div> 
      </div>
    )

}