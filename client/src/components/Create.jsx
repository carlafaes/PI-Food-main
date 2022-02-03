import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { addChar,addCharType,getDiets } from "../actions/indexAction";
import { useNavigate } from "react-router-dom";
import { Validate } from "./Validate";
import recipeCreate from './img/Alimentos-cocinar.jpg'
import Navbar from "./NavBar";
import './styles/Create.css';



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
   
   const styles={
    width:'100%'
}

   return(
       <div>
       <div className="navbar-create">
    <Navbar/>
    </div>
    <div>
    <div className="fondo-create">
    </div>
    </div>
          <div className="container-form">    
          <img className="img-create" alt="recetaCreated" src={recipeCreate} />
              {stateDiets.length > 0 ?
                <div>
                <form className="form" onSubmit={handleSubmit}>
                <label className="label-create">Name</label>
                <input className="input-create" name='name' autoComplete="name" value={diet.name} onChange={handleChange} />
                {err.name && (<p className="p">{err.name}</p>)}

                <label className="label-create">Summary</label>
                <input className="input-step" name='summary' value={diet.summary} onChange={handleChange} />
                {err.summary && (<p className="p">{err.summary}</p>)}

                <label className="label-create">Score</label>
                <input className="input-create" name="score" value={diet.score} type='number' pattern="[0-100]" min="0" max="100" onChange={handleChange} />
                {err.score && (<p className="p">{err.score}</p>)}

                <label className="label-create">Health Score</label>
                <input className="input-create" name="healthScore" type='number' pattern="[0-100]" min="0" max="100" value={diet.healthScore} onChange={handleChange} />
                {err.healthScore && (<p className="p">{err.healthScore}</p>)}

                <label className="label-create">Steps</label>
                <input className="input-step" name="steps" value={diet.steps} onChange={handleChange} />
                {err.steps && (<p className="p">{err.steps}</p>)}
                
                
                <div>
                <select className="select-create" onChange={handleSelect}>
                    {stateDiets.length > 0 && stateDiets.map((d)=>{
                        return(
                            <option className="option-diets" value={d.name} key={d.id}>
                                {d.name}
                            </option>
                        )
                    })}
                </select>
                
                <div>
                    {diet.diets.map((e) => 
                    <button className="btn-diets" key={Math.random(e)}  onClick={()=> handleDeleteDiet(e)}>
                        <img className="imgmenu" src='https://png.pngtree.com/png-clipart/20191121/original/pngtree-chef-cap-icon-for-your-design-websites-and-projects-png-image_5149051.jpg' width={40} height={25}/>
                        <p className="p-1">{e}</p>
                    </button>
                    )}
                </div>
                        {/* <ul>
                            <li className="lista-diets">
                                {diet.diets.map(e => e)}
                            </li>
                        </ul> */}
                </div>    
                

                <button className="btn-create" type='submit'>Create</button>

            </form>
            </div>
            :
             <div className="container_loading">
             {/* <div className="porcentaje" id="porcentaje">0</div> */}
             <div className="progress-bar orange stripes shine">
             <span style={styles} className="loading">Loading...</span>
             </div>
             </div>
        }
         </div>
        
       </div>
      
 
    

   )
}