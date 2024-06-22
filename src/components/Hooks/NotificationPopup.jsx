import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/Context';


const NotificationPopup = ({ notifications, onClose }) => {
  return (
    <div className="notification-popup">
      {notifications.map((notification) => (
        <div key={notification._id} className="notification">
          {notification.message}
        </div>
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`/notifications/${user.email}`);
        setNotifications(res.data);
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      }
    };

    if (user?.email) {
      fetchNotifications();
    }
  }, [user]);

  return (
    <div>
      <div className="indicator" onClick={() => setShowPopup(!showPopup)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {notifications.length > 0 && <span className="badge badge-xs badge-primary indicator-item"></span>}
      </div>
      {showPopup && (
        <NotificationPopup
          notifications={notifications}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Notifications;
