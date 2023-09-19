import React from 'react'
import './Client.css'
import logo from "../../assets/logo.png"
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../../firebase';

const Client = () => {
  const [name, setName] = React.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          name: name,
        });
        console.log("Document written with ID: ", docRef.id);
        setName("");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  return (
    <div>
      <div className="page">
        <img src={logo} className="logoImg" alt="" />
        <div className="header">
          <h1>GEN AI Workshop</h1>
        </div>
        <form className="userinput" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Client