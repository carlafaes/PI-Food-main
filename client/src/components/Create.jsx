import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { addChar,addCharType,getDiets } from "../actions/indexAction";
import { useNavigate } from "react-router-dom";
import { Validate } from "./Validate";
import recipeCreate from './img/descarga.jpeg'
import Navbar from "./NavBar";



export default function Create(){
    const dispatch= useDispatch();
    const stateDiets= useSelector(state => state.diets);
    console.log(stateDiets)
    const history= useNavigate();
    const [err,setErr]=useState({}) 

    useEffect(()=>{
        dispatch(getDiets());
        return()=>{
            dispatch(addCharType())
        }
    },[dispatch])

    const [diet,setDiets]=useState({
        name:"",
        summary:"",
        score:"",
        healthScore:"",
        image:"",
        steps:"",
        diets:[],
    })

    function handleChange(e){
        setDiets({
            ...diet,
            [e.target.name]: e.target.value
        })
        setErr(Validate({...diet, [e.target.value] : e.target.value }))
    }

    function handleSelect(e){
        setDiets({
            ...diet,
            diets:[...diet.diets,e.target.value]
        })
        setErr(Validate({...diet, diets: e.target.value}))
    }
  
    function handleDeleteDiet(e){
        setDiets({
            ...diet,
            diets:[...diet.diets.filter(d => d !== e)]
        })

    }

    function handleSubmit(e){
        e.preventDefault();
        let checkErr=[];
        if(diet.diets.length < 1){
            checkErr.push('requires at least one diet')
        }

        if(Object.values(err).length || checkErr.length){
            return alert(Object.values(err).concat(checkErr).join('\n'));
        }
    

    let succesDiets={
        name:diet.name,
        summary:diet.summary,
        score:diet.score,
        healthScore:diet.healthScore,
        image:diet.image,
        steps:diet.steps,
        diets: diet.diets,
    }
    console.log(succesDiets)
    dispatch(addChar(succesDiets));
    alert('Recipe created succesfully!');
    history('/home')
   }

   return(
       <div>
           <div>
               <Navbar/>
           </div>
                {stateDiets.length > 0 ?
                <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input name='name' autoComplete="name" value={diet.name} onChange={handleChange} />

                <label>Summary</label>
                <input name='summary' value={diet.summary} onChange={handleChange} />

                <label>Score</label>
                <input name="score" value={diet.score} type='number' pattern="[0-100]" min="0" max="100" onChange={handleChange} />

                <label>Health Score</label>
                <input name="healthScore" type='number' pattern="[0-100]" min="0" max="100" value={diet.healthScore} onChange={handleChange} />


                <label>Steps</label>
                <input name="steps" value={diet.steps} onChange={handleChange} />

                <img alt="recetaCreated" src={recipeCreate} />
                
                <div>
                <select onChange={handleSelect}>
                    {stateDiets.length > 0 && stateDiets.map((d)=>{
                        return(
                            <option value={d.id} key={d.id}>
                                {d.name}
                            </option>
                        )
                    })}
                </select>
                
                <div>
                    {diet.diets.map((e) => 
                    <button key={Math.random(e)}  onClick={()=> handleDeleteDiet(e)}>
                        <p>{e}</p>
                        
                    </button>
                    )}
                </div>
                        <ul>
                            <li>
                                {diet.diets.map(e => e)}
                            </li>
                        </ul>
                </div>    
                

                <button type='submit'>Create</button>

            </form> :
            <div>Loading..</div>
        }
       </div>
       
    

   )
}