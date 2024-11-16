#schedulebuilder 
def information(self, name, burst_time, priority):
    self.name = name 
    #time required for execution of task 
    self.burst_time = burst_time 
    #lower value means higher priority 
    self.priority = priority 

def priority_scheduling(processes):
    #sort process based on priority (ascending order, lower number = higher priority)
    processes.sort(key=lambda x: x.priority)
    total_time = 0 
    waiting_time = 0 
    turnaround_time = 0 
    print(f"{'Process':<10}{'Burst Time':<15}{'Priority':<10}{'Waiting Time':<15}{'Turnaround Time'}")
    for process in processes:
        #waiting time is the total time spent by process that came before this one 
        waiting_time += total_time
        #turnaround_time = waiting_time + process.burst_time
        print(f"{process.name:<10}{process.burst_time:<15}{process.priority:<10}{waiting_time:<15}{turnaround_time}")
        #add the burst time of the current process to the total time
        total_time += process.burst_time
    #calculate averages 
    num_processes = len(processes) 
    avg_waiting_time = waiting_time / num_processes 
    avg_turnaround_time = turnaround_time / num_processes
    print("\nAverage Waiting Time:", avg_waiting_time)
    print("Average Turnaround Time:", avg_turnaround_time)
#example usage 
if _name_ == "_main_":
    #creating list of processes with (name, burst_time, priority)
    processes = [
        Process('P1', 6, 2),
        Process('P2', 8, 1),
        Process('P3', 7, 3),
        Process('P4', 3, 4), 
    ]
    
    priority_scheduling(processes) 

