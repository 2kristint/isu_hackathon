let mylist = [1, 2, 3, 4, 5,];

// [{description: "fehifhi", start_time: , end_time},{}]
// [{description, duration, deadline},{}]

// [1,2,3,4]
// ['stirng',2,{efjie}]

// for ele in thisarray:
//     ele["start_time"]
//     ele["end-time"]

function sumOfDurations() {
    let total = myList.reduce((acc, curr) => acc + curr, 0);
    console.log("The total hours needed to complete your task is:", total);

    let interval = 7;
    if (total > interval) {
        console.log("There is not enough time for you to complete all of the tasks.");
    } else {
        console.log("You can complete all of the tasks!");
    }
}

sunOfDurations(); 