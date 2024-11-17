import practice.py

formattedAppointments = [{'title':'dentist', 'start':'10:00', 'end':'11:00'}, {'title':'calculus', 'start':'13:00', 'end':'14:30'}]
formattedTasks = []
lenAppointments = len(formattedAppointments)

sortAppointments(formattedAppointments, lenAppointments)
print(formattedAppointments)