import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import logo from "../../assets/logo.png"
import './Client.css'
import { Link } from 'react-router-dom';

const Client = () => {
  const [name, setName] = useState("");
  const [classes, setClasses] = useState("");
  const [isGroupAllotmentComplete, setIsGroupAllotmentComplete] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    // Fetch the Firestore document that tracks group allotment
    const fetchGroupAllotmentStatus = async () => {
      try {
        const docSnap = await getDoc(doc(db, "admin"));
        const data = docSnap.data();
        console.log("Current data: ", data);
        setIsGroupAllotmentComplete(data.isGroupAllotmentComplete);
      } catch (error) {
        console.error("Error fetching Firestore document: ", error);
      }
    };

    fetchGroupAllotmentStatus();
  }, []);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    validateForm(newName, classes);
  };

  const handleClassesChange = (e) => {
    const newClasses = e.target.value;
    setClasses(newClasses);
    validateForm(name, newClasses);
  };

  const validateForm = (newName, newClasses) => {
    const isNameValid = newName.trim() !== '';
    const isClassesValid = newClasses.trim() !== '';
    setIsFormValid(isNameValid && isClassesValid);
  };

  const handleSubmit = async (e) => {
    setDisableButton(true);
    e.preventDefault();
    if (isFormValid) {
      try {
        for (let i = 0; i < 100; i++) {
          const docRef = await addDoc(collection(db, "users"), {
            name: name + i,
            class: classes,
          })
        }
        console.log("Document written with ID: ", docRef.id);
        setName("");
        setClasses("");
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
            onChange={handleNameChange}
            required // Add the required attribute
          />
          <input
            type="text"
            placeholder="Enter your Class"
            value={classes}
            onChange={handleClassesChange}
            required // Add the required attribute
          />
          <button type="submit" disabled={!isFormValid || disableButton}>Submit</button>
        </form>
        <Link to="/alloted">See Alloted</Link>
      </div>
    </div>
  );
};

export default Client;
