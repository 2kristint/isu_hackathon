import React, { useState, useRef } from "react";

const AppointmentForm = () => {
    const [appointments, setAppointments] = useState([]);
    const formRefs = useRef([{ desc: "", starttime: "", endtime: "" }]);

    // Add new appointment field set
    const addAppointment = () => {
        formRefs.current.push({ desc: "", starttime: "", endtime: "" });
        setAppointments([...appointments]); // Triggers re-render
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedAppointments = formRefs.current.map((ref) => ({
            desc: ref.desc,
            starttime: ref.starttime,
            endtime: ref.endtime,
        }));
        setAppointments(updatedAppointments);
        console.log("Appointments:", JSON.stringify(updatedAppointments, null, 2));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Appointments</h2>
            {formRefs.current.map((appointment, index) => (
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
            <button type="submit" style={{ marginLeft: "0.5rem" }}>
                Save Appointments
            </button>
        </form>
    );
};

export default AppointmentForm;
