import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faPlus, faMinus, faUsers, faCalendarCheck, faChartLine, faBriefcase, faCheck, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Admins from '../admins/Admins';
import Profit from '../admins/Profit';

function Dashboard() {
  const [showAdmins, setShowAdmins] = useState(false);
  const [showProfit, setShowProfit] = useState(false);

  const adminsClick = () => {
    setShowAdmins(true)
    setShowProfit(false)
  }

  const profitClick = () => {
    setShowAdmins(false)
    setShowProfit(true)
  }

  return (
    <div className='parentDashboard'>
      <div className="sidebar">
        <div className="admin-dashboard">
          <FontAwesomeIcon icon={faUserCog} className="admin-icon" />
          <span className="admin-text">Owner Dashboard</span>
        </div>
        <ul className="sidebar-options">
          <li className="sidebar-option" onClick={adminsClick}>
            <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
            <span className="sidebar-text">Admins</span>
          </li>
          <li className="sidebar-option" onClick={profitClick}>
            <FontAwesomeIcon icon={faChartLine} className="sidebar-icon" />
            <span className="sidebar-text">Profit & Loss</span>
          </li>
        </ul>
      </div>

      <div className="content">
        <div className="nextToSidebar">
        {showAdmins && <Admins />}
        {showProfit && <Profit />}
        {" "}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;

