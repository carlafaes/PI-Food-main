import './App.css';
import {Route,Routes} from 'react-router-dom';
import Cards from './components/Cards';
import LandingPage from './components/LandingPage';
import Details from './components/Details';
import Navbar from './components/NavBar';
import Create from './components/Create';

function App() {
  return (
     <div className="App">
      <Routes>
         <Route path='/home/create/:id' element={<Navbar/>} /> 
        <Route path='/' element={<LandingPage/>} />
        <Route path='/home' element={<Cards/>}/>
        <Route path='/home/:id' element={<Details/>}/>
        <Route path='/create' element={<Create/>}/>    
      </Routes>
    </div>
  );
}

export default App;
