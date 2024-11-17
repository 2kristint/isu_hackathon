
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import { useLocation } from "react-router-dom";
import { format } from 'date-fns';
// import {
//     formatTasks,
//     createSchedule
// } from './functions.js';

const Scheduler = () => {
    const location = useLocation();
    const { appointments = [], tasks = [], start: userAnswer1, end: userAnswer2 } = location.state || {};
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
        </>
    );
};

export default Scheduler;
