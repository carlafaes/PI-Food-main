import React from "react";
import { useEffect,useState } from "react";
import Card from "./Card";
import Order from './Order'
import Pagination from "./Pagination";
import FilterByDiets from "./FilterByDiets";
import OrderByScore from "./OrderScore";
import { useDispatch,useSelector } from "react-redux";
import { getRec,getDiets } from "../actions/indexAction";


export default function Cards(){
    const renderRec= useSelector((state)=> state.filtered? state.filtered : 'Loading' );
    const dispatch= useDispatch();
    const [order,setOrder]= useState('')
    const [currentPage,setCurrentPage]= useState(1)
    const [recXPage,setRecXPage]= useState(8);
    console.log(recXPage,'recXpage')
    const max= Math.ceil(renderRec.length/recXPage);

    // const indexLastRec= currentPage * recXPage;
    // const indexFirstRec= indexLastRec - recXPage;
    // const currentRec= renderRec.slice(indexFirstRec,indexLastRec);

    //  const clickPage=(pages)=>{
    //     setCurrentPage(pages);
    // }


   console.log(renderRec,'render rec')


    useEffect(()=>{
        dispatch(getRec());
        // dispatch(getDiets())
        console.log(getRec())


    },[dispatch]);

    return(
        <div>
            <div>Food App</div>
            <div>
                <Order set={setOrder} />
            </div>
            <div>
                <OrderByScore set={setOrder} />
            </div>
            <div>
                <FilterByDiets set={setCurrentPage}/>
            </div>
            <div>
                {Object.values(renderRec).length > 0 ?
            <Pagination 
            currentPage= {currentPage}
            setCurrentPage={setCurrentPage}
            max= {max} />
            :
            <div>Loading...</div>    
            }
            </div>
            
            <div>
                  {
                    renderRec ?  Object.values(renderRec).slice(
                        (currentPage - 1)* recXPage, (currentPage -1) * recXPage + recXPage).map(
                            (recip,index)=>(
                        <div key={index}>
                            <Card
                            id={recip.id}
                            name={recip.name? recip.name : 'dont have name'}
                            image={recip.image}
                            diets={recip.diets?recip.diets.map((el)=> el.name + ', '
                            ): 'does not have diets ☹️'}
                            />
                        </div>
                    )):
                <div>
                 <h1>Loading...</h1>
                </div> 
                
            }  
            </div>
        </div>
    )
}