import React from 'react'
import UsersList from '../components/UsersList'

function Users() {
   const USERS = [{id:1, name:'Kelvin',image:'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',places:3}]
  return (
    <UsersList items={USERS}/>
  )
}

export default Users