import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useLocation } from "react-router-dom";
import { format } from 'date-fns';

const Scheduler = () => {
    const location = useLocation();
    const { appointments = [], tasks = [] } = location.state || {};

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
                plugins={[timeGridPlugin, dayGridPlugin]}
                initialView="timeGridDay"
                events={events}
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
            </div>
        </>
    );
};

export default Scheduler;
