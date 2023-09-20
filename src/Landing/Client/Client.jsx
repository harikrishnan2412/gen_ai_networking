import React from 'react'
import './Client.css'
import logo from "../../assets/logo.png"
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';

const Client = () => {
  const [name, setName] = React.useState("");
  const [classes, setClasses] = React.useState("");
  const [isGroupAllotmentComplete, setIsGroupAllotmentComplete] = React.useState(false);

  React.useEffect(() => {
    // Fetch the Firestore document that tracks group allotment
    const fetchGroupAllotmentStatus = async () => {
      ; // Replace with your Firestore collection and document
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          name: name,
          class: classes,
        });
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
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your Class"
            value={classes}
            onChange={(e) => setClasses(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <button disabled={!isGroupAllotmentComplete} >See Alloted Group</button>
      </div>
    </div>
  )
}

export default Client