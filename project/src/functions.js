export function formatData(appointments, tasks) {
    const formattedAppointments = [];
    const formattedTasks = [];

    // Format the appointments data
    for (const appointment of appointments) {
        formattedAppointments.push({
            title: appointment.title,
            start: parseInt(appointment.start_time.split(':')[0], 10),
            end: parseInt(appointment.end_time.split(':')[0], 10),
        });
    }

    // Format the tasks data
    for (const task of tasks) {
        formattedTasks.push({
            length: task.length,
            description: task.description,
            due_date: task.due_date,
        });
    }

    return { formattedAppointments, formattedTasks };
}

export function earliestAppointment(formattedAppointments) {
    // Find the earliest appointment
    let earliestApp = formattedAppointments[0].start;

    for (const appointment of formattedAppointments) {
        if (appointment.start < earliestApp) {
            earliestApp = appointment.start;
        }
    }

    return earliestApp.toString();
}

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

// Example usage:
const appointments = [
    { title: "Meeting", start_time: "10:00", end_time: "11:00" },
    { title: "Class", start_time: "09:00", end_time: "10:30" },
];

const tasks = [
    { length: 2, description: "Study", due_date: "2024-11-18" },
    { length: 1, description: "Exercise", due_date: "2024-11-18" },
];

console.log(formatData(appointments, tasks));
console.log(earliestAppointment(formatData(appointments, tasks).formattedAppointments));
console.log(sortAppointments(appointments, tasks, appointments.length));
