
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

// import {
//     formatTasks,
//     createSchedule
// } from './functions.js';

const Scheduler = () => {
    const location = useLocation();
    const { appointments = [], tasks = [], start: userAnswer1, end: userAnswer2 } = location.state || {};
    // const [modifiedValue, setModifiedValue] = useState("");

    const navigate = useNavigate();
    const [appointment, setAppointments] = useState([]);
    const [task, setTasks] = useState([]);
    const [sortedAppointments, setSortedAppointments] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd');

    function minimizeLateness(size, tasks, appointments) {
        const appIntervals = storeAppIntervals(appointments);
        let newArr = [];
        let t = 8;  // Start at 8 AM

        // Minimize lateness algorithm (earliest-first)
        for (let j = 0; j < size; j++) {
            const s = t;
            const f = t + parseInt(tasks[j].length.split('h')[0]);
            t = t + parseInt(tasks[j].length.split('h')[0]);

            // Check if task time interval is within an appointment time interval
            if (!appIntervals.some(interval => s >= interval[0] && f <= interval[1])) {
                newArr.push([s, f]);
            }
        }

        return newArr;
    }

    function formatTasks(tasks, appointments) {
        const tasksTemp = [...tasks];  // Clone tasks to preserve original
        const tasksWithTimes = minimizeLateness(tasks.length, tasks, appointments);
        const formatted = [];

        for (let i = 0; i < tasksWithTimes.length; i++) {
            console.log("formatted tasks" + formatted);
            formatted.push({
                description: tasksTemp[i].description,
                starttime: `${tasksWithTimes[i][0]}:00`,
                endtime: `${tasksWithTimes[i][1]}:00`
            });
        }

        return formatted;
    }

    function storeAppIntervals(appointments) {
        const appIntervals = [];

        appointments.forEach(appointment => {
            const startApp = parseInt(appointment.starttime.split(':')[0], 10);
            const endApp = parseInt(appointment.endtime.split(':')[0], 10);
            appIntervals.push([startApp, endApp]);
        });

        return appIntervals;
    }

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
    // Ensure appointments and tasks are correctly formatted
    console.log(tasks);
    if (appointments.length > 0 && tasks.length > 0) {
        const formattedTasksData = formatTasks(tasks, appointments);
        console.log("formatData" + formattedTasksData);
        const finalSchedule = [...formattedTasksData, ...appointments];
        setSchedule(finalSchedule);
    }
}, [appointments, tasks]);

useEffect(() => {
    console.log(schedule)
    // Map the schedule to events when schedule is updated
    if (schedule.length > 0) {
        const formatSchedule = schedule.map((ele) => ({
            title: ele.title,
            start: formattedDate + 'T' + ele.starttime,
            end: formattedDate + 'T' + ele.endtime,
        }));
        setEvents(formatSchedule);
        console.log(events)
        setLoading(false);
    }

}, [schedule, formattedDate]);

return (
    <button onClick={handleBack}>
        <FullCalendar
            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            events={events}
            editable={true}
            droppable={true}
            headerToolbar={false}
            contentHeight='auto'
        />
        <>
            {!loading ? (
                <FullCalendar
                    plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                    initialView="timeGridDay"
                    events={events}
                    editable={true}
                    droppable={true}
                    headerToolbar={false}
                    contentHeight='auto'
                />
            ) : (
                <p>Loading calendar...</p>
            )}
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
                {userAnswer1 ? (
                    <p>Wakeup: {JSON.stringify(userAnswer1)}</p>
                ) : (
                    <p>No wakeup time was passed from the form.</p>
                )}
                {userAnswer2 ? (
                    <p>Sleep: {JSON.stringify(userAnswer2)}</p>
                ) : (
                    <p>No sleep time were passed from the form.</p>
                )}
                <h2>Sorted Appointments:</h2>
                <pre>{JSON.stringify(schedule, null, 2)}</pre>
            </div>
            <button type="back" style={{ marginLeft: "0.5rem" }} className="scheduler-backButton">
                Back
            </button>
        </button>
        );
};

        export default Scheduler;
