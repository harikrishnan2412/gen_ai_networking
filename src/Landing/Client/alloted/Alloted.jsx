import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase'; // Import your Firebase instance here
import './Alloted.css';

const Allot = () => {
    const [groupData, setGroupData] = useState([]);

    useEffect(() => {
        // Fetch group data from Firestore
        const fetchGroupData = async () => {
            try {
                const q = query(collection(db, 'groups'));
                const querySnapshot = await getDocs(q);
                const groups = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    groups.push(data);
                });

                setGroupData(groups);
            } catch (error) {
                console.error('Error fetching group data:', error);
            }
        };

        fetchGroupData();
    }, []); // Fetch data once when the component mounts

    return (
        <div className='allotment'>
            <h1>Group Allotment</h1>
            {/* Pass group data as a prop to Alloted */}
            <div>
                {groupData.map((group, index) => (
                    <div key={index}>
                        <h3>Group {group.groupNumber}</h3>
                       <div className="order">
                            <ul>
                                {group.groupMembers.map((member, memberIndex) => (
                                    <li key={memberIndex}>{member.name} of {member.class}</li>

                                ))}
                            </ul>
                       </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Allot;
