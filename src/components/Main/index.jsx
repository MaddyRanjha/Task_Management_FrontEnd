import { Route, Routes, Navigate } from "react-router-dom";
import react, {useState, useEffect} from 'react';
import axios from "axios";
import DateTimePicker from "react-datetime-picker"
import { FaBell, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./style.css";

function Main() {
  const [reminderMsg, setReminderMsg] = useState("");
    const [remindAt, setRemindAt] = useState();
    const [user, setUser] = useState([]);
    const [notificationSetting, setNotificationSetting] = useState(false)

    useEffect(()=>{
      axios.get("http://localhost:8080/api/auth").then(res => setUser(res.data));
      console.log(user)
    },[])

    const addReminder =() =>{
      // axios.post("https://todo-backend-aq5e.onrender.com/addReminder", {reminderMsg, remindAt})
      // .then(res => setReminderList(res.data));
      // console.log(reminderList);
      // setReminderMsg("");
      // setRemindAt("");
      
    }
    const deleteReminder =(id)=>{
      // axios.post("https://todo-backend-aq5e.onrender.com/deleteReminder",{id})
      // .then(res => setReminderList(res.data));

    }
    const setNotification =(id)=>{
      setNotificationSetting(!notificationSetting);
    }
    const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.reload();
    };

  return (
    <div className="App">
    <div className='homepage'>
      <div className='header'>
        <span className='logo'>
          <h4>Task Manager</h4>
        </span>
        <span className='account'>
        <span>Pending Tasks</span>
        <span>Completed Task</span>
        <button className="logout_btn" onClick={handleLogout}>
					Logout
				</button>
        </span>

      </div>
      <div className='homepage_header'>
        <h1>
          Remind Me 🙋‍♂️
        </h1>
        <input type='text' placeholder='Reminder Notes Here...' value={reminderMsg} onChange={e => setReminderMsg(e.target.value)}></input>
        <DateTimePicker value={remindAt} onChange={setRemindAt} minDate={new Date()} minutePlaceholder="mm"
        hourPlaceholder="hh"
        dayPlaceholder='DD'
        monthPlaceholder='MM'
        yearPlaceholder='YYYY' 
        ></DateTimePicker>
        <div className='button' onClick={addReminder}>Add Task</div>

      </div>
      <div className='homepage_body'>
        
         <div className='reminder_card'>
          <h2>Task Tittle here...</h2>
          <h4>Your Message here</h4>
          <p>Remind Me at: 12/05/2023 12:23Pm</p>
          <div className='features'>
          <span className='bellIcon' onClick={setNotification}><FaBell/></span>
          <span><FaPencilAlt/></span>
          <span><MdDelete/></span>
          </div>
          {notificationSetting && <div>
            <h6>Notification Setting</h6>
            <span class="dropdown">
              <button class="dropbtn">Frequency</button>
              <div class="dropdown-content">
                <a href="#">Daily</a>
                <a href="#">Weekly</a>
                <a href="#">Monthly</a>
              </div>
            </span>
            <span class="dropdown">
            
              <button class="dropbtn">Type Of Notification</button>
              <div class="dropdown-content">
                <a href="#">SMS</a>
                <a href="#">Email</a>
                <a href="#">Push Notification</a>
              </div>
            
            </span>
            </div>}
        </div>
        <div className='reminder_card'>
          <h2>Task Tittle here...</h2>
          <h4>Your Message here</h4>
          <p>Remind Me at: 12/05/2023 12:23Pm</p>
          <div className='features'>
          <span><FaBell/></span>
          <span><FaPencilAlt/></span>
          <span><MdDelete/></span>
          </div>
        </div>
        <div className='reminder_card'>
          <h2>Task Tittle here...</h2>
          <h4>Your Message here</h4>
          <p>Remind Me at: 12/05/2023 12:23Pm</p>
          <div className='features'>
          <span><FaBell/></span>
          <span><FaPencilAlt/></span>
          <span><MdDelete/></span>
          </div>
        </div>
        <div className='reminder_card'>
          <h2>Task Tittle here...</h2>
          <h4>Your Message here</h4>
          <p>Remind Me at: 12/05/2023 12:23Pm</p>
          <div className='features'>
          <span><FaBell/></span>
          <span><FaPencilAlt/></span>
          <span><MdDelete/></span>
          </div>
        </div>
        <div className='reminder_card'>
          <h2>Task Tittle here...</h2>
          <h4>Your Message here</h4>
          <p>Remind Me at: 12/05/2023 12:23Pm</p>
          <div className='features'>
          <span><FaBell/></span>
          <span><FaPencilAlt/></span>
          <span><MdDelete/></span>
          </div>
        </div>
        <div className='reminder_card'>
          <h2>Task Tittle here...</h2>
          <h4>Your Message here</h4>
          <p>Remind Me at: 12/05/2023 12:23Pm</p>
          <div className='features'>
          <span><FaBell/></span>
          <span><FaPencilAlt/></span>
          <span><MdDelete/></span>
          </div>
        </div>
        
      </div>

    </div>
    </div>
  );
}

export default Main;