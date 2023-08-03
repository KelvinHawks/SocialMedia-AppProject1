import React, {useState} from 'react'
import Mainheader from './Mainheader'
import Navlinks from './Navlinks'
import Backdrop from '../../UIElements/Backdrop'
import Sidedrawer from './Sidedrawer'
import './MainNavigation.css'
import { Link } from 'react-router-dom'

function Mainnavigation(props) {
    const[drawerisOpen, setdrawerisOpen] = useState(false)
    const openDrawerHandler = ()=>{
        setdrawerisOpen(true)
    }
    const closeDrawerHandler = ()=>{
        setdrawerisOpen(false)
    }
  return (
    <>
    {drawerisOpen && <Backdrop onClick={closeDrawerHandler}/> }
    
    <Sidedrawer show={drawerisOpen} onClick={closeDrawerHandler}>
        <nav className='main-navigation__drawer-nav'>
            <Navlinks/>
        </nav>
    </Sidedrawer>
   <Mainheader>
    <button className='main-navigation__menu-btn'
        onClick={openDrawerHandler}
    >
        <span className="active"/>
        <span/>
        <span className='active'/>
    </button>
    <h1 className='main-navigation__title'>
        <Link to='/'>YourPlaces</Link>
    </h1>
    <nav className='main-navigation__header-nav'>
        <Navlinks/>
    </nav>
   </Mainheader>
   </>
  )
}

export default Mainnavigation