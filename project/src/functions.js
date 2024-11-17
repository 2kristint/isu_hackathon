// export function formatData(appointments, tasks) {
//     const formattedAppointments = [];
//     const formattedTasks = [];

//     // Format the appointments data
//     for (const appointment of appointments) {
//         formattedAppointments.push({
//             title: appointment.title,
//             start: parseInt(appointment.start_time.split(':')[0], 10),
//             end: parseInt(appointment.end_time.split(':')[0], 10),
//         });
//     }

//     // Format the tasks data
//     for (const task of tasks) {
//         formattedTasks.push({
//             length: task.length,
//             description: task.description,
//             due_date: task.due_date,
//         });
//     }

//     return { formattedAppointments, formattedTasks };
// }

// export function earliestAppointment(formattedAppointments) {
//     let earliestApp = formattedAppointments[0].start;

//     for (const appointment of formattedAppointments) {
//         if (appointment.start < earliestApp) {
//             earliestApp = appointment.start;
//         }
//     }

//     return earliestApp.toString();
// }

export function sortAppointments(appointments, tasks, lenAppointments) {
    const { formattedAppointments } = formatData(appointments, tasks);

    // Sort appointment times from earliest to latest
    for (let s = 0; s < lenAppointments; s++) {
        let minIdx = s;

        for (let i = s + 1; i < lenAppointments; i++) {
            if (formattedAppointments[i].start < formattedAppointments[minIdx].start) {
                minIdx = i;
            }
        }

        // Swap the minimum element to its correct position
        [formattedAppointments[s], formattedAppointments[minIdx]] = [formattedAppointments[minIdx], formattedAppointments[s]];
    }

    return formattedAppointments;
}

export function sortTasks(tasks) {
    // Convert deadlines to Date objects
    tasks.forEach(task => {
        task.deadline = new Date(task.deadline);
    });

    // Sort tasks by deadline
    return tasks.sort((a, b) => a.deadline - b.deadline);
}

export function minimizeLateness(size, tasks, appointments) {
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

export function formatTasks(tasks, appointments) {
    const tasksTemp = [...tasks];  // Clone tasks to preserve original
    const tasksWithTimes = minimizeLateness(tasks.length, tasks, appointments);
    const formatted = [];

    for (let i = 0; i < tasksWithTimes.length; i++) {
        console.log("formatted tasks" + formatted);
        formatted.push({
            title: tasksTemp[i].description,
            starttime: `${tasksWithTimes[i][0]}:00`,
            endtime: `${tasksWithTimes[i][1]}:00`
        });
    }

    return formatted;
}

// export function createSchedule(tasks, appointments) {
//     return [...appointments, ...tasks];  // Merge appointments and tasks
// }

export function storeAppIntervals(appointments) {
    const appIntervals = [];

    appointments.forEach(appointment => {
        const startApp = parseInt(appointment.starttime.split(':')[0], 10);
        const endApp = parseInt(appointment.endtime.split(':')[0], 10);
        appIntervals.push([startApp, endApp]);
    });

    return appIntervals;
}

// // Example data
// const formattedTasks = [
//     { description: 'practice drums', length: '1h', deadline: '2003-03-10T10:00' },
//     { description: 'read', length: '2h', deadline: '2003-03-10T17:00' },
//     { description: 'visit grandma', length: '1h', deadline: '2003-03-10T12:00' }
// ];

// const formattedAppointments = [
//     { title: 'mentor meeting', starttime: '8:00', endtime: '9:00' },
//     { title: 'kickboxing', starttime: '7:00', endtime: '7:45' },
//     { title: 'calculus', starttime: '13:00', endtime: '14:30' },
//     { title: 'dentist', starttime: '10:00', endtime: '11:00' }
// ];

// // Run the schedule creation and print the result
// console.log(createSchedule(formatTasks(formattedTasks, formattedAppointments), formattedAppointments));
