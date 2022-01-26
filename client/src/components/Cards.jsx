import React from "react";
import { useEffect,useState } from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import { useDispatch,useSelector } from "react-redux";
import { getRec } from "../actions/indexAction";


export default function Cards(){
    const renderRec= useSelector((state)=> state.filtered? state.filtered.result : 'aun no hay nada' );
    const page= useSelector((state)=> state.filtered? state.filtered.total : 'aun no hay page')
    const dispatch= useDispatch();
    const [currentPage,setCurrentPage]= useState(1)
//     const renderRec= useSelector((state)=> state.filtered? state.filtered.result : 'aun no hay nada' );
//     const page= useSelector((state)=> state.filtered? state.filtered.total : 'aun no hay page')
//    const [recipeXP,setRecipeXP]= useState(9)
  
const paginated= (pageNumber)=>{
    setCurrentPage(pageNumber);
}
console.log(renderRec,'render rec')
    console.log(page,'page')
    useEffect(()=>{
        dispatch(getRec());
        console.log(getRec())

    },[dispatch]);

    return(
        <div>
            <div>Food App</div>
            <div>
                {renderRec.length > 0 ?
            <Pagination
             paginated= {paginated}
             
            /> :
            <div>Loading...</div>   
            } 
             </div>
            <div>
                  {
                 renderRec ? 
                 (
                    Object.values(renderRec).map((recip,index)=>(
                        <div key={index}>
                            <Card
                            id={recip.id}
                            name={recip.name}
                            image={recip.image}
                            diets={recip.diets?recip.diets.map((el)=> el.name + ', '
                            ): 'does not have diets ☹️'}
                            />
                        </div>
                    ))
                ) :
                (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                )
            }  
            </div>
        </div>
    )
}