# def main():
#     formattedAppointments = [{'title':'dentist', 'start':'10:00', 'end':'11:00'}, {'title':'calculus', 'start':'13:00', 'end':'14:30'}]
#     formattedTasks = []
#     lenAppointments = len(formattedAppointments)

#     sortAppointments(formattedAppointments, lenAppointments)
#     print(formattedAppointments)

from datetime import datetime
from random import randint

def formatData(appointments, tasks):
    # Format the appointments data

    # add each appointment / class (dictionary) to formattedAppointments list
    for appointment in appointments:
        formattedAppointments.append({
            'title': appointment['title'],
            'start': int(appointment['start_time'][:appointment['start_time'].find(':')]),
            'end': int(appointment['end_time'][:appointment['end_time'].find(':')])
        })

    # Format the tasks data

    # add each task (dictionary) to formattedTasks list 
    for task in tasks:
        formattedTasks.append({
            'length': task['length'],
            'description': task['description'],
            'due_date': task['due_date']
        })

    return formattedAppointments, formattedTasks

def earliestAppointment(formattedAppointments):

    # find earliest appointment
    earliestApp = formattedAppointments[0]['time']

    for appointment in formattedAppointments:
        if (appointment['start'] < earliestApp):
            earliestApp = appointment['start']

    earliestApp = earliestApp[:earliestApp.find(":")]
    return earliestApp




def sortAppointments(appointments, tasks, lenAppointments):
    
    # sort appointment times from earliest to latest
    formatData(appointments, tasks)
    for s in range(lenAppointments):
        min_idx = s
        
        for i in range(s + 1, lenAppointments):
            
            # For sorting in descending order
            # for minimum element in each loop
            if appointments[i]['start'] < appointments[min_idx]['start']:
                min_idx = i

        # Arranging min at the correct position
        (appointments[s], appointments[min_idx]) = (appointments[min_idx], appointments[s])

# formattedAppointments = [{'title':'mentor meeting', 'start_time':'8:00', 'end_time':'9:00'}, {'title':'kickboxing', 'start_time':'7:00', 'end_time':'7:45'}, {'title':'calculus', 'start_time':'13:00', 'end_time':'14:30'}, {'title':'dentist', 'start_time':'10:00', 'end_time':'11:00'}]
# formattedTasks = [{'length':'1hr', 'description':'study chemistry', 'due date':'17:00'}, {'length':'2hr', 'description':'practice drums', 'due date':'17:00'}]
# lenAppointments = len(formattedAppointments)

# sortAppointments(formattedAppointments, formattedTasks, lenAppointments)
# print(formattedAppointments)

# string = 'hello'
# word = string[string.find('h'):string.find('l')]
# print(word)


def sortTasks(tasks):

    for task in tasks:
        task['deadline'] = datetime.strptime(task['deadline'], '%Y-%m-%dT%H:%M')

    tasks_sorted = sorted(tasks, key=lambda x: x['deadline'])
    return tasks_sorted

    # for task in tasks_sorted:
    #     print(task)


    # # sort task times from earliest to latest
    # min_idx = 0
    # for s in range(length):
    #     min_idx = s
        
    #     for i in range(s + 1, length):
            
    #         # For sorting in descending order
    #         # for minimum element in each loop
    #         start_index = tasks[i]['deadline'].find('T')+1
    #         end_index = tasks[i]['deadline'].find(':')

    #         start_index2 = tasks[min_idx]['deadline'].find('T')+1
    #         end_index2 = tasks[min_idx]['deadline'].find(':')
    #         if int(tasks[i]['deadline'][start_index:end_index]) < int(tasks[min_idx]['deadline'][start_index2:end_index2]):
    #             min_idx = i

    #     # Arranging min at the correct position
    #     print(tasks[s])
    #     print(tasks[min_idx])
    #     (tasks[s], tasks[min_idx]) = (tasks[min_idx], tasks[s])

    # telling python how to interperate the date and time
    # for task in tasks:
    #     task['deadline'] = datetime.strptime(task['deadline'], '%Y-%m-%d')

    # # python sorting function, based on deadline (ascending order)
    # tasks_sorted = sorted(tasks, key=lambda x: x['deadline'])


def minimizeLateness(size, tasks, appointments):

    # sort tasks in ascending order of deadline
    tasks = sortTasks(tasks)

    appIntervals = storeAppIntervals(appointments)
    newArr = []
    t = 8

    # minimize lateness algorithm (earliest-first) 
    for j in range(size):
        s = t
        f = t + int(tasks[j]['duration'][:tasks[j]['duration'].find('h')])
        t = t + int(tasks[j]['duration'][:tasks[j]['duration'].find('h')]) + randint(0,3)

        # check if task time interval is within an appointment time interval
        if ([s,f] in appIntervals):
            pass
        else:
            newArr.append([s,f])

    return newArr

def formatTasks(tasks, appointments):

    tasksTemp = tasks
    tasks = minimizeLateness(len(tasks), tasks, appointments)
    format = []
    i = 8           # start scheduling at 8am
    for task in tasks:
        format.append({'description':tasksTemp[i]['description'], 'starttime':task[0], 'endtime':task[1]})
        i += 1
    return format

def createSchedule(tasks, appointments):

    schedule = appointments + tasks

    sortedSchedule = sorted(schedule, key=lambda task: task["starttime"])

    return sortedSchedule

def storeAppIntervals(appointments):

    app_intervals = []
    for appointment in appointments:
        start_app = int(appointment['starttime'][:appointment['starttime'].find(':')])
        end_app = int(appointment['endtime'][:appointment['endtime'].find(':')])

        app_intervals.append([start_app, end_app])
        return app_intervals

        # if (t in range(start_app, end_app)):
        #     schedule.append(appointment)
        
        # else:
        #     # randomly schedule task until next appointment interval
        #     pass
            

formattedTasks = [{'description':'practice drums', 'duration':'1hr', 'deadline':'2003-03-10T10:00'}, {'description':'read', 'duration':'2hr', 'deadline':'2003-03-10T17:00'}, {'description':'visit grandma', 'duration':'1hr', 'deadline':'2003-03-10T12:00'}]

formattedAppointments = [{'title':'mentor meeting', 'starttime':'8:00', 'endtime':'9:00'}, {'title':'kickboxing', 'starttime':'7:00', 'endtime':'7:45'}, {'title':'calculus', 'starttime':'13:00', 'endtime':'14:30'}, {'title':'dentist', 'starttime':'10:00', 'endtime':'11:00'}]

# sortedTasks = sortTasks(formattedTasks, len(formattedTasks))
# for i in sortedTasks:
#     print(i)

createSchedule(formatTasks(minimizeLateness(len(formattedTasks), formattedTasks, formattedAppointments), formattedAppointments), formattedAppointments)

# print(formatTasks(formattedTasks))

# print(sortTasks(formattedTasks))

