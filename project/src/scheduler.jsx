import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import { useLocation } from "react-router-dom";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import "./scheduler.css"
// import { loadPyodide as initPyodide } from "pyodide";
import { formatData, earliestAppointment, sortAppointments } from './functions.js';


const Scheduler = () => {
    const location = useLocation();
    const { appointments = [], tasks = [], start: userAnswer1, end: userAnswer2 } = location.state || {};
    // const [modifiedValue, setModifiedValue] = useState("");

    const navigate = useNavigate();
    const [appointment, setAppointments] = useState([]);
    const [task, setTasks] = useState([]);
    const [sortedAppointments, setSortedAppointments] = useState([]);

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    console.log(formattedDate);

    useEffect(() => {
        const sampleAppointments = [
            { title: 'Meeting', start_time: '10:00', end_time: '11:00' },
            { title: 'Class', start_time: '09:00', end_time: '10:30' },
        ];
        const sampleTasks = [
            { length: 2, description: 'Study', due_date: '2024-11-18' },
            { length: 1, description: 'Exercise', due_date: '2024-11-18' },
        ];

        // Format data
        const { formattedAppointments, formattedTasks } = formatData(sampleAppointments, sampleTasks);
        setAppointments(formattedAppointments);
        setTasks(formattedTasks);

        // Find earliest appointment
        const earliest = earliestAppointment(formattedAppointments);
        console.log('Earliest Appointment: ', earliest);

        // Sort appointments
        const sorted = sortAppointments(sampleAppointments, sampleTasks, sampleAppointments.length);
        setSortedAppointments(sorted);

    }, []);


    const events = appointments.map((appointment) => ({
        title: appointment.description,
        start: formattedDate + 'T' + appointment.start_time,
        end: formattedDate + 'T' + appointment.end_time,
    }));

    // Handle back button 
    const handleBack = (e) => {

        //navigate to form page
        navigate("/form");

    };

    return (
        <button onClick = {handleBack}>
            <FullCalendar
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                initialView="timeGridDay"
                events={events}
                editable={true}
                droppable={true}
                headerToolbar={false}
                contentHeight='auto'
            />
            <div>
                <h1>Data Passed</h1>
                {appointments.length > 0 ? (
                    <p>Appointments passed: {JSON.stringify(appointments)}</p>
                ) : (
                    <p>No appointments were passed from the form.</p>
                )}
                {tasks.length > 0 ? (
                    <p>Tasks passed: {JSON.stringify(tasks)}</p>
                ) : (
                    <p>No tasks were passed from the form.</p>
                )}
                {userAnswer1.length > 0 ? (
                    <p>Wakeup: {JSON.stringify(userAnswer1)}</p>
                ) : (
                    <p>No wakeup time was passed from the form.</p>
                )}
                {userAnswer2.length > 0 ? (
                    <p>Sleep: {JSON.stringify(userAnswer2)}</p>
                ) : (
                    <p>No sleep time were passed from the form.</p>
                )}
                <h2>Sorted Appointments:</h2>
                <pre>{JSON.stringify(sortedAppointments, null, 2)}</pre>
            </div>
            <button type="back" style={{ marginLeft: "0.5rem" }} className = "scheduler-backButton">
                Back
            </button>
        </button>
    );
};

export default Scheduler;