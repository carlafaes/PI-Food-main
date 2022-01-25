import React from "react";
import { useEffect,useState } from "react";
import Card from "./Card";
import { useDispatch,useSelector } from "react-redux";
import { getRec } from "../actions/indexAction";


export default function Cards(){
    const dispatch= useDispatch();
    const renderRec= useSelector((state)=> state.filtered);
    console.log(renderRec,'render rec')

    useEffect(()=>{
        dispatch(getRec());
        console.log(getRec())

    },[dispatch]);

    return(
        <div>
            <div>Food App</div>
            <div>
                  {
                 renderRec ? 
                 (
                    renderRec.map((recip,index)=>(
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