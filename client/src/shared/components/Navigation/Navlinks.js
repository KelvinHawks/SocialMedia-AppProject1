import React, {useContext, useState} from 'react'
import { NavLink } from 'react-router-dom'
import './NavLinks.css'
import { AuthContext } from '../../context/auth-context'
import Modal from '../../UIElements/Modal'
import Button from '../FormElements/Button'
function Navlinks(props) {
    const[showLogoutModal, setShowLogoutModal] = useState(false)
    const[deleteModal, setdeletemodal] = useState(false)
    const auth = useContext(AuthContext)
    const logoutModalHandler = ()=>{
        setShowLogoutModal(true)   
    }
    const cancelLogoutModal = ()=>{
        setShowLogoutModal(false)
        setdeletemodal(false)
    }
    const confirmLogoutModal = ()=>{
        setShowLogoutModal(false)
        auth.logout()
    }
    
  return (
    <React.Fragment>
        <Modal 
                show={showLogoutModal} 
                onCancel={deleteModal}
                header='Logout?' 
                footerClass='place-item__modal-actions' 
                footer={
                <React.Fragment>
                    <Button inverse onClick={cancelLogoutModal}>Cancel</Button>
                    <Button danger onClick={confirmLogoutModal}>LOGOUT</Button>
                </React.Fragment>}
            
        />      
        <ul className='nav-links'>
            <li>
                <NavLink to='/' exact>ALL USERS</NavLink>
            </li>
            {auth.isLoggedIn && (<li>
                <NavLink to='/u1/places'>MY PLACES</NavLink>
            </li>)}
            {auth.isLoggedIn && (<li>
                <NavLink to='/places/new'>ADD PLACE</NavLink>
            </li>)}
            {!auth.isLoggedIn && (<li>
                <NavLink to='/auth'>AUTHENTICATE</NavLink>
            </li>)}
            {auth.isLoggedIn && (
                <li>
                    <button onClick={logoutModalHandler}>LOGOUT</button>
                </li>
            )}
        </ul>
    </React.Fragment>
  )
}

export default Navlinks