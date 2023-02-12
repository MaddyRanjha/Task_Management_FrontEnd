import './App.css';
import react, {useState, useEffect} from 'react';
import axios from "axios";
import DateTimePicker from "react-datetime-picker"

function App() {
  const [reminderMsg, setReminderMsg] = useState("");
    const [remindAt, setRemindAt] = useState();
    const [reminderList, setReminderList] = useState([]);

    useEffect(()=>{
      axios.get("https://todo-backend-aq5e.onrender.com/getAllReminder").then(res => setReminderList(res.data));
    },[])

    const addReminder =() =>{
      axios.post("https://todo-backend-aq5e.onrender.com/addReminder", {reminderMsg, remindAt})
      .then(res => setReminderList(res.data));
      console.log(reminderList);
      setReminderMsg("");
      setRemindAt("");
      
    }
    const deleteReminder =(id)=>{
      axios.post("https://todo-backend-aq5e.onrender.com/deleteReminder",{id})
      .then(res => setReminderList(res.data));

    }

  return (
    <div className="App">
      {/* {console.log(reminderList)} */}
    <div className='homepage'>
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
        <div className='button' onClick={addReminder}>Add Reminder</div>

      </div>
      <div className='homepage_body'>
        {reminderList.map(reminder =>{
          return (<div className='reminder_card' key={reminder._id}>
          <h2>{reminder.reminderMsg}</h2>
          <h3>Remind Me at:</h3>
          <p>{String(new Date(reminder.remindAt.toLocaleString(undefined, {timezone:"Asia/Kolkata"})))}</p>
          <div className='button' onClick={()=>deleteReminder(reminder._id)}>Delete</div>
        </div>)
        })}
      </div>

    </div>
    </div>
  );
}

export default App;
