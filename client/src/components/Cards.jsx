import React from "react";
import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import Card from "./Card";
import Order from './Order'
import Pagination from "./Pagination";
import FilterByDiets from "./FilterByDiets";
import OrderByScore from "./OrderScore";
import SearchBar from "./SearchBar";
import OrderCreated from "./OrderCreated";
import Navbar from "./NavBar";
import { useDispatch,useSelector } from "react-redux";
import { getRec } from "../actions/indexAction";
import recipeCreated from './img/Alimentos-cocinar.jpg'
import './styles/Cards.css';


export default function Cards(){
    const renderRec= useSelector((state)=> state.filtered? state.filtered : 'loading' );
    const dispatch= useDispatch();
    const [order,setOrder]= useState('')
    const [currentPage,setCurrentPage]= useState(1)
    const [recXPage,setRecXPage]= useState(8);
    console.log(recXPage,'recXpage')
    const max= Math.ceil(renderRec.length/recXPage);

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () =>{
        setSidebar(!sidebar);
    } 


//    console.log(renderRec,'render rec')

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

    const styles={
        width:'100%'
    }

    return(
        <div className="fondo2">
            <div className="container">
            <Navbar className='navbar'/>
             
             <div>
             <Link to='#' className='menu-bars'>
                   <button className="button1" onClick={showSidebar}>
                   <img className="imgmenu" src='https://cdn4.iconfinder.com/data/icons/hotel-and-restaurant-line-vol-3/52/menu__list__navigation__options__restaurant__menucard__hotel-512.png' width={90} height={60}/>
                   </button>
                </Link>
                 <button className="btn_reset" onClick={e => {handleClickReset(e)}}>
                     Reset
                 </button>
             </div>
             
                <div>
                <SearchBar value={setOrder} set={setCurrentPage ? setCurrentPage : <h1 className="loading">Loading</h1>}/>
                        
                </div>

               
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <button className="button2" onClick={showSidebar}>
                    ❌
                    </button>
                    
                    <ul  className='nav-menu-items' >
                    <div>
                       <li  className='navbar-toggle'>
                        <OrderCreated set={setOrder}  />
                       </li>
                    </div>
                    <div>
                       <li className='navbar-toggle'>
                        <Order set={setOrder} />
                       </li>  
                    </div>
                    <div>
                      <li className='navbar-toggle'>
                        <FilterByDiets set={setOrder} set={setCurrentPage}/>
                      </li> 
                    </div>
                    <div>
                       <li className='navbar-toggle'>
                        <OrderByScore set={setOrder}  />
                       </li> 
                    </div>
                  

                </ul>
                </nav>
                
                
             
            <div>
                {renderRec && Object.values(renderRec).length > 0 ?
                     <Pagination 
                         currentPage= {currentPage}
                        setCurrentPage={setCurrentPage}
                        max= {max} />
                     :
                 <div className="not-found">Recipe doesn't found ☹️</div>    
                }
            </div>
            
            <div className="div-card">
                  {
                    renderRec === 'loading' ? 
                    <div className="container_loading">
                        {/* <div className="porcentaje" id="porcentaje">0</div> */}
                        <div className="progress-bar orange stripes shine">
                        <span style={styles} className="loading">Loading...</span>
                        </div>
                    </div>
                     :
                         Object.values(renderRec).slice(
                        (currentPage - 1)* recXPage, (currentPage -1) * recXPage + recXPage).map(
                            (recip,index)=>(
                        <div className="div-c" key={index}>
                            <Card
                            
                            id={recip.id}
                            name={recip.name? recip.name : 'dont have name'}
                            image={recip.image? recip.image : recipeCreated}
                            diets={recip.diets?recip.diets.map((el)=> el.name + ', '
                            ): 'does not have diets  '}
                            />
                        </div>
                    ))
                
            }  
            </div>
 
        </div>
        </div>

    )
}