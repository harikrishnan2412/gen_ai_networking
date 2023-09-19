import React from "react";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="page">
      <div className="userinput">
        <input type="number" placeholder="Enter team number" />
        <button>submit</button>
      </div>

      <br />
      <button>Release</button>
    </div>
  );
};

export default Admin;
