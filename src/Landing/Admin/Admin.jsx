import React, { useState } from 'react';
import { collection, addDoc, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../firebase';
import './Admin.css';

const Admin = () => {
  const [numTeams, setNumTeams] = useState(0);

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
      const groupMembers = participants.slice(i * 10, (i + 1) * 10);

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

    setNumTeams(0);
  };

  return (
    <div className="page">
      <h2>300</h2>
      <form className="userinput" onSubmit={handleRelease}>
        <input
          type="number"
          placeholder="Enter number of teams"
          value={numTeams}
          onChange={(e) => setNumTeams(parseInt(e.target.value, 10))}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Admin;
