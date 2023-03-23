import React, { useState, useEffect } from 'react';
import { FaBell, FaPencilAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import './style.css';
import UpdateTask from './UpdateTask';

function Card(props) {
  // const userId = props.task.user;
  console.log(props);
  const task = props.value;
  console.log(task);

  const [taskDetails, setTaskDetails] = useState([]);
  const [notificationSetting, setNotificationSetting] = useState(false);

  const updateNotification = () => {
    console.log('Hello');
  };

  return (
    <>
      {!task.editTask ? (
        <div className="reminder_card" key={task._id}>
          <h2>{task.name}</h2>
          <h4>{task.desc}</h4>
          <p>Remind Me at: {task.date}</p>
          <div className="features">
            <div className="notification">
              <span className="noti">{task.notification}</span>
              <span className="freq">{task.frequency}</span>
            </div>
            <div className="setting">
              <span className="editBtn">
                <FaPencilAlt
                  onClick={(e) => props.setNotificationChanges(task)}
                />
              </span>
              <span
                className="deleteIcon"
                onClick={(e) => props.deleteTask(task._id)}
              >
                <MdDelete />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <UpdateTask task={task} updateTask={props.updateTask} />
      )}
    </>
  );
}

export default Card;
