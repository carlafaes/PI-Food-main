import React from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getDetails } from "../actions/indexAction";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import imgRecipe from './img/descarga.jpeg'

export default function Details(){
    const dispatch= useDispatch();
    const {id}= useParams();
    const recipes= useSelector((state)=> state.details);
    console.log(recipes,'este es el recipes')

    useEffect(()=>{
        dispatch(getDetails(id))
        
    },[dispatch,id])
  

    return(
        <div>
            <div>
                    <Link to='/home'>
                        <button>Go back</button>
                    </Link>
            </div>

            <div>
                
                    {recipes && Object.keys(recipes).length > 0  ?
                <>
                    <h1>Name: {recipes.title? recipes.title : recipes[0].name} </h1>

                    <h3>Score: {recipes.spoonacularScore ? recipes.spoonacularScore : recipes[0].score}</h3>

                    <h3>HealthScore:{recipes.healthScore? recipes.healthScore : recipes[0].healthScore }</h3>

                    <img src={recipes.image? recipes.image : imgRecipe} alt="imageRecipe" />

                    <h3>Steps:{recipes.analyzedInstructions? 
                    recipes.analyzedInstructions.map((e)=> e.steps.map((e)=> 
                    <ul key={Math.random(id)}>
                     <li >{e.step}</li>
                    </ul>)) :
                     recipes[0].steps}
                    </h3>

                    <h3>Summary: {recipes.summary? <div dangerouslySetInnerHTML={{ __html: recipes.summary}}/> : recipes[0].summary} </h3>
                    
                    <h3>Diets: {recipes.diets?recipes.diets.map((e)=> e) : recipes[0].diets[0].name}</h3>
                    
                </>
                :
                 <div>
                    <h1>Loading...</h1>
                </div>    
                }
                
           </div> 
      </div>
    )

}