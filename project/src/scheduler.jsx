import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import { useLocation } from "react-router-dom";
import { format } from 'date-fns';
// import { loadPyodide as initPyodide } from "pyodide";


const Scheduler = () => {
    const location = useLocation();
    const { appointments = [], tasks = [], start: userAnswer1, end: userAnswer2 } = location.state || {};
    // const [modifiedValue, setModifiedValue] = useState("");

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    console.log(formattedDate);


    // useEffect(() => {
    //     async function setupPyodide() {
    //         try {
    //             const pyodide = await initPyodide(); // Initialize Pyodide

    //             // Define the variable to pass
    //             const initialValue = "Hello";

    //             // Run Python code to modify the variable
    //             const result = await pyodide.runPythonAsync(`
    //             value = "${initialValue}"  # Input variable
    //             print(f"Original value: {value}")
    //             value += " meow"  # Append "meow"
    //             value  # Return the modified value
    //             `);

    //             console.log("Modified Value from Python:", result); // Log result in console
    //             setModifiedValue(result); // Update state to display result on the page
    //         } catch (error) {
    //             console.error("Error initializing Pyodide or running Python code:", error);
    //         }
    //     }

    //     setupPyodide();
    // }, []);


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
            </div>
        </>
    );
};

export default Scheduler;