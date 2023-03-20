// import { Route, Routes, Navigate } from 'react-router-dom';
import react, { useState, useEffect } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import { FaBell, FaPencilAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import './style.css';

function Main() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState();
  const [noti, setNoti] = useState(false);
  const [notification, setNotification] = useState('SMS');
  const [frequency, setFrequency] = useState('daily');
  

  const [userDetails, setUserDetails] = useState();
  const [taskDetails, setTaskDetails] = useState([]);
  const [notificationSetting, setNotificationSetting] = useState(false);

  const data = localStorage.getItem('token');
  const userDet = JSON.parse(data);
  const user = userDet.userId;
  console.log(user);

  useEffect(() => {
    const fetchUserAndTaskDetails = async () => {
      try {
        const userDetailsResponse = await axios.get(
          `https://task-management-app-backend.onrender.com/api/auth/${userDet.userId}`
        );
        setUserDetails(userDetailsResponse.data.data);

        const taskDetailsResponse = await axios.get(
          `https://task-management-app-backend.onrender.com/api/task/${userDet.userId}`
        );
        setTaskDetails(taskDetailsResponse.data.data);
      } catch (error) {
        console.error(error);
      
      }
    };

    fetchUserAndTaskDetails();
  }, []);

  console.log(taskDetails)

  const addTask = async () => {
    console.log("**")
    await axios
      .post('https://task-management-app-backend.onrender.com/api/task', {
        user,
        name,
        desc,
        date,
        noti,
        notification,
        frequency,
      })
      .then((res) => console.log(res));
      const taskDetailsResponse = await axios.get(
        `https://task-management-app-backend.onrender.com/api/task/${userDet.userId}`
      );
      setTaskDetails(taskDetailsResponse.data.data);
      setName("");
      setDesc("");
      setDate("");
      alert("Task Added Successfully!!")
  };
  const deleteTask = async (id) => {
    await axios
      .delete(`https://task-management-app-backend.onrender.com/api/task/${id}`)
      .then((res) => console.log(res));
      const taskDetailsResponse = await axios.get(
        `https://task-management-app-backend.onrender.com/api/task/${userDet.userId}`
      );
      setTaskDetails(taskDetailsResponse.data.data);
      alert("Task Deleted Successfully!!")
  };
  const setNotificationChanges = (id) => {
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
            placeholder="Enter Task Name Here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Enter Task Description Here..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></input>
          <DateTimePicker
            value={date}
            onChange={setDate}
            minDate={new Date()}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
          ></DateTimePicker>
          <div className="notification_selector">
            <span className="dropdown">
              <button className="dropbtn">Frequency</button>
              <div className="dropdown-content">
                <a href="www.abc.com">Daily</a>
                <a href="www.abc.com">Weekly</a>
                <a href="www.abc.com">Monthly</a>
              </div>
            </span>
            <span className="dropdown">
              <button className="dropbtn">Type Of Notification</button>
              <div className="dropdown-content">
                <a href="www.abc.com">SMS</a>
                <a href="www.abc.com">Email</a>
                <a href="www.abc.com">Push Notification</a>
              </div>
            </span>
          </div>
          <div className="button" onClick={addTask}>
            Add Task
          </div>
        </div>
        <div className="homepage_body">
          {taskDetails.map((task) => (
           <div className="reminder_card" key={task._id}>
              <h2>{task.name}</h2>
              <h4>{task.desc}</h4>
              <p>Remind Me at: {task.date}</p>
              <div className="features">
                <span
                  className="bellIcon"
                  onClick={() => setNotificationChanges(task._id)}
                >
                  <FaBell />
                </span>
                <span className='editBtn'>
                  <FaPencilAlt />
                </span>
                <span
                  className="deleteIcon"
                  onClick={() => deleteTask(task._id)}
                >
                  <MdDelete />
                </span>
              </div>
              {notificationSetting && (
                <div>
                  <h6>Notification Setting</h6>
                  <span className="dropdown">
                    <button className="dropbtn">Frequency</button>
                    <div className="dropdown-content">
                      <a href="www.abc.com">Daily</a>
                      <a href="www.abc.com">Weekly</a>
                      <a href="www.abc.com">Monthly</a>
                    </div>
                  </span>
                  <span className="dropdown">
                    <button className="dropbtn">Type Of Notification</button>
                    <div className="dropdown-content">
                      <a href="www.abc.com">SMS</a>
                      <a href="www.abc.com">Email</a>
                      <a href="www.abc.com">Push Notification</a>
                    </div>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
