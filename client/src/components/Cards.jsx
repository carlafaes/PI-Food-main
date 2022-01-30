import React from "react";
import { useEffect,useState } from "react";
import Card from "./Card";
import Order from './Order'
import Pagination from "./Pagination";
import FilterByDiets from "./FilterByDiets";
import OrderByScore from "./OrderScore";
import SearchBar from "./SearchBar";
import { useDispatch,useSelector } from "react-redux";
import { getRec } from "../actions/indexAction";
import recipeCreated from './img/descarga.jpeg'


export default function Cards(){
    const renderRec= useSelector((state)=> state.filtered? state.filtered : 'loading' );
    const dispatch= useDispatch();
    const [order,setOrder]= useState('')
    const [currentPage,setCurrentPage]= useState(1)
    const [recXPage,setRecXPage]= useState(8);
    console.log(recXPage,'recXpage')
    const max= Math.ceil(renderRec.length/recXPage);


   console.log(renderRec,'render rec')

   function handleClickReset(e){
       e.preventDefault(e);
       dispatch(getRec())
       setCurrentPage(1)
   }


    useEffect(()=>{
        dispatch(getRec());
        // dispatch(getDiets())
        console.log(getRec())


    },[dispatch]);

    return(
        <div>
            
             <div>Food App</div>
             <div>
                 <button onClick={e => {handleClickReset(e)}}>
                     Reset
                 </button>
             </div>
             <div>
                    <SearchBar value={setOrder}/>
            </div>
            <div>
                    <Order set={setOrder} />
            </div>
            <div>
                     <OrderByScore set={setOrder} />
            </div>
            <div>
                    <FilterByDiets set={setOrder}/>
            </div>

            <div>
                {Object.values(renderRec).length > 2 ?
                     <Pagination 
                         currentPage= {currentPage}
                        setCurrentPage={setCurrentPage}
                        max= {max} />
                     :
                 <div>Recipe doesn't found</div>    
                }
            </div>
            
            <div>
                  {
                    renderRec === 'loading' ? 
                    <div>
                        <h1>loading</h1>
                   </div> :
                         Object.values(renderRec).slice(
                        (currentPage - 1)* recXPage, (currentPage -1) * recXPage + recXPage).map(
                            (recip,index)=>(
                        <div key={index}>
                            <Card
                            id={recip.id}
                            name={recip.name? recip.name : 'dont have name'}
                            image={recip.image? recip.image : recipeCreated}
                            diets={recip.diets?recip.diets.map((el)=> el.name + ', '
                            ): 'does not have diets ☹️'}
                            />
                        </div>
                    ))
                
            }  
            </div>

{/*             
            <div>
                  {
                    recipesRender ?  Object.values(recipesRender).slice(
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
            </div> */}
 
        </div>
    )
}