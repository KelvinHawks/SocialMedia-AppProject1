import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import Mainnavigation from './shared/components/Navigation/Mainnavigation';
import Userplaces from './places/pages/Userplaces';
import './App.css';


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
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
