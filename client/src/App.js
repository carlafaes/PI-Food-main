import './App.css';
import {Route,Routes} from 'react-router-dom';
import Cards from './components/Cards';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/home' element={<Cards/>}/>
      </Routes>
    </div>
  );
}

export default App;
