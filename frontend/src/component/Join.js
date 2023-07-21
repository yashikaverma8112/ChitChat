import React, { useState } from 'react'
import './Join.css'
import logo1 from '../images/logo1.png'
import {Link} from 'react-router-dom'

let user;
const Join = () => {

  const [name, setname] = useState("");
  const sendUser =() =>{
    user = document.getElementById('joinInput').value ;
    document.getElementById('joinInput').value  ='';

  }
  return (
    <div className='JoinPage'>
     <div className='JoinContainer'>
        <img src={logo1} alt="logo" />
            {/* <h1>Chit-Chat</h1> */}
            <input type="text" onChange={(e)=>setname(e.target.value)} placeholder='Enter Your Name' id="joinInput" />
         <Link onClick={(event)=> !name ? event.preventDefault() :null}  to='/chat'>  <button  onClick = {sendUser} className='joinbtn'>Join</button> </Link> 
     </div>
    </div>
  )
}

export default Join
export {user};
