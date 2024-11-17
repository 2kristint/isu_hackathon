import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useLocation } from "react-router-dom";

const Scheduler = () => {
    const location = useLocation();
    const { appointments = [], tasks = [] } = location.state || {};

    const schedulerData = [
        { startDate: '2024-11-16T09:45', endDate: '2024-11-16T11:00', title: 'Meeting' },
        { startDate: '2024-11-16T12:00', endDate: '2024-11-16T13:30', title: 'Go to the gym' },
    ];

    const events = schedulerData.map(event => ({
        title: event.title,
        start: event.startDate,
        end: event.endDate,
    }));

    // const events = appointments.map((appointment) => ({
    //     title: appointment.desc,
    //     start: appointment.starttime,
    //     end: appointment.endtime,
    // }));

    return (
        <>
            <FullCalendar
                plugins={[timeGridPlugin, dayGridPlugin]}
                initialView="timeGridDay"
                events={events}
                headerToolbar={false}
                contentHeight='auto'
            />
            <div>
                <h1>About Page</h1>
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
            </div>
        </>
    );
};

export default Scheduler;
