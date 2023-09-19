import React from 'react'
import './Client.css'
import logo from "../../assets/logo.png"

const Client = () => {
  return (
    <div>
      <div className="page">
        <img src={logo} className="logoImg" alt="" />
        <div className="header">
          <h1>GEN AI Workshop</h1>
        </div>
        <form className="userinput">
          <input type="text" placeholder='Enter your name' />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Client