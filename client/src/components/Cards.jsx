import React from "react";
import { useEffect,useState } from "react";
import Card from "./Card";
import Order from './Order'
import Pagination from "./Pagination";
import { useDispatch,useSelector } from "react-redux";
import { getRec,getDiets } from "../actions/indexAction";


export default function Cards(){
    const renderRec= useSelector((state)=> state.filtered? state.filtered : 'aun no hay nada' );
    const dispatch= useDispatch();
    const [order,setOrder]= useState('')
    const [currentPage,setCurrentPage]= useState(1)
    const [loading,setLoading]= useState(false)


   console.log(renderRec,'render rec')


    useEffect(()=>{
        setLoading(true)
        dispatch(getRec());
        // dispatch(getDiets())
        console.log(getRec())
        setLoading(false)

    },[dispatch]);

    return(
        <div>
            <div>Food App</div>
            <div>
                <Order set={setOrder} />
            </div>
            
            <div>
                  {
                 loading ?  <div>
                 <h1>Loading...</h1>
                </div> :
                 
                    Object.values(renderRec).map((recip,index)=>(
                        <div key={index}>
                            <Card
                            id={recip.id}
                            name={recip.name? recip.name : 'dont have name'}
                            image={recip.image}
                            diets={recip.diets?recip.diets.map((el)=> el.name + ', '
                            ): 'does not have diets ☹️'}
                            />
                        </div>
                    ))
                
            }  
            </div>
        </div>
    )
}