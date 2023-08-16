import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import Mainnavigation from './shared/components/Navigation/Mainnavigation';
import Userplaces from './places/pages/Userplaces';
import './App.css';
import UpdatePlace from './places/pages/UpdatePlace';


function App() {
  return (
    <div className="App">
      <Router>
        <Mainnavigation/>
        <main>
          <Routes>
            <Route path='/' exact element={<Users/>}></Route>
            <Route path='/places/new' exact element={<NewPlace/>}></Route>
            <Route path='/:userId/places' exact element={<Userplaces/>}></Route>
            <Route path='/places/:placeId' exact element={<UpdatePlace/>}></Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
