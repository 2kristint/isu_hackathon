import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

const Scheduler = () => {
    const schedulerData = [
        { startDate: '2024-11-16T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
        { startDate: '2024-11-16T12:00', endDate: '2018-11-01T13:30', title: 'Go to the gym' },
    ];

    const events = schedulerData.map(event => ({
        title: event.title,
        start: event.startDate,
        end: event.endDate,
    }));

    return (
        <FullCalendar
            plugins={[timeGridPlugin, dayGridPlugin]}
            initialView="timeGridDay"
            events={events}
            headerToolbar={false}
            contentHeight='auto'
        />
    );
};

export default Scheduler;
