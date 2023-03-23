// import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import './style.css';
import Card from './card';

function Main() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState();
  const editNoti = false;
  const editTask = false;
  const [notification, setNotification] = useState('SMS');
  const [frequency, setFrequency] = useState('Daily');

  // const [userDetails, setUserDetails] = useState();
  const [taskDetails, setTaskDetails] = useState([]);
  const [notificationSetting, setNotificationSetting] = useState(false);

  const data = localStorage.getItem('token');
  const userDet = JSON.parse(data);
  const user = userDet.userId;

  // @Fetch All Tasks
  useEffect(() => {
    const fetchUserAndTaskDetails = async () => {
      try {
        // const userDetailsResponse = await axios.get(
        //   `http://localhost:8080/api/auth/${userDet.userId}`
        // );
        // setUserDetails(userDetailsResponse.data.data);

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

  // @Adding a Task
  const addTask = async () => {
    console.log('**');
    await axios
      .post('https://task-management-app-backend.onrender.com/api/task', {
        user,
        name,
        desc,
        date,
        editNoti,
        editTask,
        notification,
        frequency,
      })
      .then((res) => console.log(res));
    const taskDetailsResponse = await axios.get(
      `https://task-management-app-backend.onrender.com/api/task/${userDet.userId}`
    );
    setTaskDetails(taskDetailsResponse.data.data);
    setName('');
    setDesc('');
    setDate('');
    alert('Task Added Successfully!!');
  };

  // @Delete a Task
  const deleteTask = async (taskId) => {
    await axios
      .delete(`https://task-management-app-backend.onrender.com/api/task/${taskId}`)
      .then((res) => console.log(res));
    const taskDetailsResponse = await axios.get(
      `https://task-management-app-backend.onrender.com/api/task/${userDet.userId}`
    );
    setTaskDetails(taskDetailsResponse.data.data);
    console.log(taskId);
    alert('Task Deleted Successfully!!');
  };

  const setNotificationChanges = (task) => {
    console.log('Hello');
    task.editTask = !task.editTask;

    setNotificationSetting(!notificationSetting);
  };

  // @Update a Task
  const updateTask = async (task) => {
    console.log(
      `${task.name}  ${task.desc}  ${task.frequency} ${task.notification}`
    );
    const user = task.user;
    const name = task.name;
    const desc = task.desc;
    const date = task.date;
    const notification = task.notification;
    const frequency = task.frequency;
    await axios
      .put(`https://task-management-app-backend.onrender.com/api/task/${task._id}`, {
        user,
        name,
        desc,
        date,
        editNoti,
        editTask,
        notification,
        frequency,
      })
      .then((res) => console.log(res));
    const taskDetailsResponse = await axios.get(
      `https://task-management-app-backend.onrender.com/api/task/${userDet.userId}`
    );
    setTaskDetails(taskDetailsResponse.data.data);
    alert('Task Updated Successfully!!');
    task.editTask = !task.editTask;
    setNotificationSetting(!notificationSetting);
  };

  // @LogOut Function
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
            className="dateTimePicker"
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
            <select
              className="dropdown"
              value={notification}
              onChange={(event) => setNotification(event.target.value)}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>

            <select
              className="dropdown"
              value={frequency}
              onChange={(event) => setFrequency(event.target.value)}
            >
              <option value="SMS">SMS</option>
              <option value="Email">Email</option>
              <option value="Push Notification">Push Notification</option>
            </select>
          </div>
          <div className="button" onClick={addTask}>
            Add Task
          </div>
        </div>
        <div className="homepage_body">
          {taskDetails.map((task) => (
            <Card
              value={task}
              deleteTask={deleteTask}
              setNotificationChanges={setNotificationChanges}
              updateTask={updateTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
