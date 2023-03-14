// import { Route, Routes, Navigate } from 'react-router-dom';
import react, { useState, useEffect } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import { FaBell, FaPencilAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import './style.css';

function Main() {
  const [reminderMsg, setReminderMsg] = useState('');
  const [remindAt, setRemindAt] = useState();
  const [userDetails, setUserDetails] = useState();
  const [taskDetails, setTaskDetails] = useState([]);
  const [notificationSetting, setNotificationSetting] = useState(false);


  const data = localStorage.getItem('token');
  const user = JSON.parse(data);
  console.log(user);

  useEffect(() => {
    axios
      .get(`https://task-management-app-backend.onrender.com/api/auth/${user.userId}`)
      .then((res) => setUserDetails(res.data.data));
    axios
      .get(`https://task-management-app-backend.onrender.com/api/task/${user.userId}`)
      .then((res) => setTaskDetails(res.data.data));
  }, []);
  // console.log(userDetails._id);
  // console.log(taskDetails);

  const [taskData, setTaskData] = useState({
    user: "",
		name: "",
		desc: "",
		date: Date.now(),
    noti:"false",
		notification: "SMS",
    frequency:"daily",
	});

  const addReminder = () => {
    // axios.post("https://todo-backend-aq5e.onrender.com/addReminder", {reminderMsg, remindAt})
    // .then(res => setReminderList(res.data));
    // console.log(reminderList);
    // setReminderMsg("");
    // setRemindAt("");
  };
  const deleteReminder = (id) => {
    // axios.post("https://todo-backend-aq5e.onrender.com/deleteReminder",{id})
    // .then(res => setReminderList(res.data));
  };
  const setNotification = (id) => {
    setNotificationSetting(!notificationSetting);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="App">
      <div className="homepage">
        <div className="header">
          <span className="logo">
            <h4>Task Manager</h4>
          </span>
          <span className="account">
            <span>Pending Tasks</span>
            <span>Completed Task</span>
            <span className="acount_detail">
              {/* <p>{userDetails.firstName}</p> */}
              <button className="logout_btn" onClick={handleLogout}>
                Logout
              </button>
            </span>
          </span>
        </div>
        <div className="homepage_header">
          <h1>Manage Task 🙋‍♂️</h1>
          <input
            type="text"
            placeholder="Reminder Notes Here..."
            value={reminderMsg}
            onChange={(e) => setReminderMsg(e.target.value)}
          ></input>
          <DateTimePicker
            value={remindAt}
            onChange={setRemindAt}
            minDate={new Date()}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
          ></DateTimePicker>
          <div className="button" onClick={addReminder}>
            Add Task
          </div>
        </div>
        <div className="homepage_body">
          {taskDetails.map((a) => {
            return (
              <div className="reminder_card">
                <h2>{a.name}</h2>
                <h4>{a.desc}</h4>
                <p>Remind Me at: {a.date}</p>
                <div className="features">
                  <span className="bellIcon" onClick={setNotification}>
                    <FaBell />
                  </span>
                  <span>
                    <FaPencilAlt />
                  </span>
                  <span>
                    <MdDelete />
                  </span>
                </div>
                {notificationSetting && (
                  <div>
                    <h6>Notification Setting</h6>
                    <span class="dropdown">
                      <button class="dropbtn">Frequency</button>
                      <div class="dropdown-content">
                        <a href="www.abc.com">Daily</a>
                        <a href="www.abc.com">Weekly</a>
                        <a href="www.abc.com">Monthly</a>
                      </div>
                    </span>
                    <span class="dropdown">
                      <button class="dropbtn">Type Of Notification</button>
                      <div class="dropdown-content">
                        <a href="www.abc.com">SMS</a>
                        <a href="www.abc.com">Email</a>
                        <a href="www.abc.com">Push Notification</a>
                      </div>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
}

export default Main;
