import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./forms.css";


const formsTogether = () => {

    const location = useLocation();
    const { start: userAnswer1, end: userAnswer2 } = location.state || {};

    const [userInput, setUserInput] = useState("");
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const formRefsAppointments = useRef([{ desc: "", starttime: "", endtime: "" }]);

    // Add new appointment field set
    const addAppointment = () => {
        formRefsAppointments.current.push({ desc: "", starttime: "", endtime: "" });
        setAppointments([...appointments]); // Triggers re-render
    };

    const [tasks, setTasks] = useState([]);
    const formRefsTasks = useRef([{ desc: "", duration: "", deadline: "" }]);

    // Add new appointment field set
    const addTask = () => {
        formRefsTasks.current.push({ desc: "", duration: "", deadline: "" });
        setTasks([...tasks]); // Triggers re-render
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedAppointments = formRefsAppointments.current.map((ref) => ({
            desc: ref.desc,
            starttime: ref.starttime,
            endtime: ref.endtime,
        }));
        // setAppointments(updatedAppointments);

        const updatedTasks = formRefsTasks.current.map((ref) => ({
            desc: ref.desc,
            duration: ref.duration,
            deadline: ref.deadline,
        }));
        // setTasks(updatedTasks);

        console.log("Appointments:", JSON.stringify(updatedAppointments, null, 2));
        console.log("Appointments:", JSON.stringify(updatedTasks, null, 2));

        //navigate to scheduler w/ data
        navigate("/scheduler", { state: { appointments: updatedAppointments, tasks: updatedTasks, start: userAnswer1, end: userAnswer2 } });

    };

    // Handle back button 
    const handleBack = (e) => {

        //navigate to quiz page
        navigate("/");

    };



    return (
        
        <form onSubmit={handleSubmit}>
            <div className = "background">
            <div className = "appointments-border">
            <h2>Appointments</h2>
           
            {formRefsAppointments.current.map((appointment, index) => (

                <div key={index} style={{ marginBottom: "1rem" }}>
                    <input
                        type="text"
                        placeholder="Description"
                        onChange={(e) => (appointment.desc = e.target.value)}
                        style={{ marginRight: "0.5rem" }}
                    />
                    <input
                        type="time"
                        onChange={(e) => (appointment.starttime = e.target.value)}
                        style={{ marginRight: "0.5rem" }}
                    />
                    <input
                        type="time"
                        onChange={(e) => (appointment.endtime = e.target.value)}
                        style={{ marginRight: "0.5rem" }}
                    />
                </div>
            ))}
            </div>
            <button type="button" onClick={addAppointment} className="forms-addappointment-button">
                Add Appointment
            </button>
            <div className = "tasks-border">
            <h2 >Tasks</h2>
            {formRefsTasks.current.map((task, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
                    <input
                        type="text"
                        placeholder="Description"
                        onChange={(e) => (task.desc = e.target.value)}
                        style={{ marginRight: "0.5rem" }}
                    />
                    <input
                        type="text"
                        placeholder="Duration (e.g., 2h 30m)"
                        onChange={(e) => (task.duration = e.target.value)}
                        style={{ marginRight: "0.5rem" }}
                    />
                    <input
                        type="datetime-local"
                        onChange={(e) => (task.deadline = e.target.value)}
                        style={{ marginRight: "0.5rem" }}
                    />
                </div>
                
            ))}
            </div>
            <button  onClick = {handleBack} type="button" 
            style={{ marginLeft: "0.5rem" }}
             className = "back-button">
                Back
            </button>
            <button type="button" onClick={addTask} style={{ marginLeft: "1rem" }} className = "task-button">
                Add Task
            </button>
            <button type="submit" style={{ marginLeft: "1rem" }} className = "forms-submitButton">
                Submit All
            </button>
            </div>
        </form>
        
        
    );

}

export default formsTogether;