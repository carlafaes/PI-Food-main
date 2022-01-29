import React from 'react';
import { useState } from 'react';


 


export default function Pagination({currentPage,setCurrentPage,max}){
   const [input,setInput]= useState(1);
    
   const nextPage= ()=>{
       setInput(parseInt(input) + 1);
       setCurrentPage(parseInt(currentPage) + 1);
   }
   const previousPage=()=>{
       setInput(parseInt(input) - 1);
       setCurrentPage(parseInt(currentPage) - 1);
   }
    const onKeyDown=(e)=>{
        if(e.keyCode === 13){
            if(parseInt(e.target.value < 1) || parseInt(e.target.value) > Math.ceil(max) || isNaN(parseInt(e.target.value))){
                setCurrentPage(1)
                setInput(1)
            }else{
                setCurrentPage(parseInt(e.target.value))
            }
        }
    }
    const onChange= (e)=>{
        setInput(e.target.value)
    }
     return(
         <div>
           <button onClick={previousPage} disabled={currentPage === 1 || currentPage < 1}>pre</button>

           <input name='page' autoComplete='off' value={input} onKeyDown={e => onKeyDown(e)} onChange={ e => onChange(e)} />

           <p> de {max}</p>

           <button onClick={nextPage} disabled={currentPage === 13 || currentPage > 13}>next</button>
         </div>
     )
}