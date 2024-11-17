import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import { useLocation } from "react-router-dom";
import { format } from 'date-fns';

const Scheduler = () => {
    const location = useLocation();
    const { appointments = [], tasks = [], start: userAnswer1, end: userAnswer2 } = location.state || {};

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    console.log(formattedDate);


    const events = appointments.map((appointment) => ({
        title: appointment.desc,
        start: formattedDate + 'T' + appointment.starttime,
        end: formattedDate + 'T' + appointment.endtime,
    }));

    return (
        <>
            <FullCalendar
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                initialView="timeGridDay"
                events={events}
                editable={true} // Enable drag-and-drop
                droppable={true} // Allow tasks to be dropped onto the calendar
                // eventDrop={handleEventDrop} // Handle event drop
                // eventResize={handleEventResize} // Handle event resize
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
                    <p>No tasks were passed from the form.</p>
                )}
                {userAnswer2.length > 0 ? (
                    <p>Sleep: {JSON.stringify(userAnswer2)}</p>
                ) : (
                    <p>No tasks were passed from the form.</p>
                )}
            </div>
        </>
    );
};

export default Scheduler;