def get_schedule():
    #list to store schedule details 
    schedule = []
    print("Welcome to your schedule builder!")
    print("You can add events to your schedule. Type 'done' when you're finished.\n")

    while True:
        #get day of eventhhh
        day = input("Enter the day of the event (e.g., Monday, Tuesday, ect.: ").strip()

        if day.lower() == 'done':
            break
        #get start time
        start_time = input("Enter the start time (e.g., 9:00AM): ").strip()
        #get end time
        end_time = input("Enter the end time (e.g., 10:00AM): ").strip()
        #get description of the event
        description = input("Enter the description of the event: ").strip()

        #add the event to the schedule list
        schedule.append({
            'day': day,
            'start_time': start_time,
            'end_time': end_time,
            'description': description
        })

    return schedule

def print_schedule(schedule):
    if not schedule:
        print("Your schedule is empty.")
        return
    print("\nYour Schedule:")
    for event in schedule:
        print(f"{event['day']}: {event['start_time']} - {event['end_time']}|{event['description']}")


def main():
    #get the schedule from user
    schedule = get_schedule()
    #display the schedule
    print_schedule(schedule)

if __name__ == "__main__":
    main()
