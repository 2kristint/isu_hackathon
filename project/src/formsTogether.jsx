import React, { useState, useRef } from "react";

const formsTogether = () => {
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
        setAppointments(updatedAppointments);
        console.log("Appointments:", JSON.stringify(updatedAppointments, null, 2));
        const updatedTasks = formRefsTasks.current.map((ref) => ({
            desc: ref.desc,
            duration: ref.duration,
            deadline: ref.deadline,
        }));
        setAppointments(updatedTasks);
        console.log("Appointments:", JSON.stringify(updatedTasks, null, 2));
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="button" onClick={addAppointment}>
                Add Appointment
            </button>
            <h2>Tasks</h2>
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
            <button type="button" onClick={addTask}>
                Add Appointment
            </button>
            <button type="submit" style={{ marginLeft: "0.5rem" }}>
                Submit All
            </button>
        </form>
    );

}

export default formsTogether;