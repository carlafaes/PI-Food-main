import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

 


export default function Pagination({page,renderRec,paginated}){
   
    const pageNumber=[]
    
    


   
   

    for(let i =1; i <Math.ceil(page/renderRec); i++){
        pageNumber.push(i+1)
    }
    console.log(pageNumber)
    console.log(renderRec,'render rec')
    console.log(page,'page')
    return(
        <div>
            <ul>
                {pageNumber && pageNumber.map(num => (
                    <li key={num}>
                        <button onClick={()=> paginated(num)}>
                            {num}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}