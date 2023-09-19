import React from 'react'
import './Admin.css'

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
    <div className='page'>
        <div className="userinput">
        <input type="number" placeholder='Enter team number'/>
        <button>
            submit
        </button>
        </div>
        
        <br />
        <button>
            Release
        </button>
    </div>
  );
};

export default Admin;
