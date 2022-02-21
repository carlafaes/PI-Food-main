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
import { getRec,getDiets } from "../actions/indexAction";
import recipeCreated from './img/Alimentos-cocinar.jpg'
import './styles/Cards.css';


export default function Cards(){
    //tarigo el estado filtered con todas las recetas precargadas si aun no tiene nada muestra loading en la consola
    const renderRec= useSelector((state)=> state.filtered? state.filtered : 'loading' );
    //uso el hook useDispatch para despachar la accion al store
    const dispatch= useDispatch();
    //declaro la variable que va a contener el estado order que empieza con valor '' y luego se setea
    const [order,setOrder]= useState('')
    const [currentPage,setCurrentPage]= useState(1)
    // variable que arranca en 8,ya que recXPage es la cantidad de cards que se van a renderizar en el componente cards 
    const [recXPage,setRecXPage]= useState(9);
    console.log(recXPage,'recXpage')
    //variable max hace una division del estado renderRec(que tiene todas las recetas) y recXPage,se usa Math.ceil para que redondee el resultado para arriba
    const max= Math.ceil(renderRec.length/recXPage);
    //la constante sideBar arranca con su estado en false, ya que quiero q no se visualice en el inicio
    const [sidebar, setSidebar] = useState(false);
    //constante que guarda la funcion que mostrara el menu lateral,si esta en false cambia a true y viceversa
    const showSidebar = () =>{
        setSidebar(!sidebar);
    } 


//    console.log(renderRec,'render rec')
 //funcion que al pasarle el event va a invocar la funcion getRec que trae todas las recetas y setea la pagina actual en 1
   function handleClickReset(e){
       e.preventDefault(e);
       dispatch(getRec())
       setCurrentPage(1)
   }

   //hook que simula efectos secundarios en el componente(componentDidMount, componentDidUpdate y componentWillUnmount)
    useEffect(()=>{
        dispatch(getRec());
         dispatch(getDiets())
        console.log(getRec())
        console.log(getDiets(),'getdiets')


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
                   <img className="imgmenu" alt="cheff" src='https://cdn4.iconfinder.com/data/icons/hotel-and-restaurant-line-vol-3/52/menu__list__navigation__options__restaurant__menucard__hotel-512.png' width={90} height={60}/>
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