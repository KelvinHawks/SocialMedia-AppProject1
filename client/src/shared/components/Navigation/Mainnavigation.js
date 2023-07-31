import React, {useState} from 'react'
import Mainheader from './Mainheader'
import Navlinks from './Navlinks'
import Backdrop from '../../UIElements/Backdrop'
import Sidedrawer from './Sidedrawer'
import './MainNavigation.css'
import { Link } from 'react-router-dom'

function Mainnavigation(props) {
    const[drawerisOpen, setdrawerisOpen] = useState(false)
    const openDrawer = ()=>{
        setdrawerisOpen(true)
    }
    const closeDrawer = ()=>{
        setdrawerisOpen(false)
    }
  return (
    <>
    {drawerisOpen && <Backdrop onClick={closeDrawer}/> }
    {drawerisOpen && <Sidedrawer>
        <nav className='main-navigation__drawer-nav'>
            <Navlinks/>
        </nav>
    </Sidedrawer>}
   <Mainheader>
    <button className='main-navigation__menu-btn'
        onClick={openDrawer}
    >
        <span/>
        <span/>
        <span/>
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