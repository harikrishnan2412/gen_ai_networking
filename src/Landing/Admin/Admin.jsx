import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, getDocs } from 'firebase/firestore'; // Import necessary Firestore functions
import { db } from '../../../firebase';
import "./Admin.css"

const Admin = () => {
  const [numTeams, setNumTeams] = useState(10);

  useEffect(() => {
    // You may want to fetch the number of teams or any other initial data here
  }, []);

  const handleRelease = async (event) => {
    event.preventDefault();
    if (numTeams <= 0) {
      return;
    }

    // Fetch the list of participants from the 'users' collection
    const participants = [];
    const usersQuery = query(collection(db, 'users'));
    const userSnapshot = await getDocs(usersQuery);

    userSnapshot.forEach((doc) => {
      participants.push(doc.data());
    });

    // Shuffle the participants randomly
    participants.sort(() => Math.random() - 0.5);

    // Calculate the number of groups needed
    const numParticipants = participants.length;
    const numGroups = Math.ceil(numParticipants / 10);

    // Create groups and assign participants
    for (let i = 0; i < numGroups; i++) {
      const groupNumber = i + 1;
      const groupMembers = participants.slice(i * 20, (i + 1) * 20).map((participant) => participant);
      console.log(`Group ${groupNumber} has ${groupMembers} members.`);

      try {
        const docRef = await addDoc(collection(db, 'groups'), {
          groupNumber,
          groupMembers,
        });
        console.log(`Group ${groupNumber} created with ${groupMembers.length} members.`);
      } catch (error) {
        console.error(`Error creating group ${groupNumber}:`, error);
      }
    }
    // Replace with your Firestore collection and document
    const docRef = await addDoc(collection(db, "admin"), {
      isGroupAllotmentComplete: true,
    });
    console.log("Document written with ID: ", docRef.id);

    const adminDocRef = doc(db, "admin"); // Replace with your Firestore collection and document
    try {
      await updateDoc(adminDocRef, { isGroupAllotmentComplete: true });
    } catch (error) {
      console.error("Error updating Firestore: ", error);
    }
    setNumTeams(0);
  };

  return (
    <div className='page'>
      {/* You can add UI elements here if needed */}
      <button onClick={handleRelease}>
        Release
      </button>
    </div>
  );
};

export default Admin;
