import React, { useState } from 'react';
import './style.css';
import DateTimePicker from 'react-datetime-picker';

function UpdateTask(props) {
  const task = props.task;
  const [changedTime, setChangedTime] = useState(task.date);

  const [notificationSetting, setNotificationSetting] = useState(false);

  const updateTask = (task) => {
    console.log('Hello');
    // task.editTask= !task.editTask
    // setNotificationSetting(!notificationSetting);
    props.onUpdateTask();
  };
  return (
    <div className="homepage_header">
      <h1>Manage Task 🙋‍♂️</h1>
      <input
        type="text"
        placeholder="Enter Task Name Here..."
        // value={task.name}
        onChange={(e) => (task.name = e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Enter Task Description Here..."
        // value={task.desc}
        onChange={(e) => (task.desc = e.target.value)}
      ></input>
      {/* <DateTimePicker
            className="dateTimePicker"
            // value={task.date}
            onChange={(e) => task.date= e.target.value}
            minDate={new Date()}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
          ></DateTimePicker> */}
      <div className="notification_selector">
        <select
          className="dropdown"
          // value={notification}
          onChange={(event) => (task.notification = event.target.value)}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>

        <select
          className="dropdown"
          // value={frequency}
          onChange={(event) => (task.frequency = event.target.value)}
        >
          <option value="SMS">SMS</option>
          <option value="Email">Email</option>
          <option value="Push Notification">Push Notification</option>
        </select>
      </div>
      <div className="button" onClick={(e) => props.updateTask(task)}>
        Add Task
      </div>
    </div>
  );
}

export default UpdateTask;
