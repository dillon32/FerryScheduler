var dayOfTheWeek = "";
var direction = "";
var origin = "";
var destination = "";
var button = "";
var LIRRcsv = createArray(2);
var Ferrycsv = createArray(2);
var userTime = "";

async function getMTime() {
    console.log("HIT getMTime");
        const response = await fetch("militaryTime.csv");
        const data = await response.text();

        var selectedTime = "";

        if(button == "arriving") {
        var e = document.getElementById("arrivalTime");
        selectedTime = e.options[e.selectedIndex].text;
        } else {
        var e = document.getElementById("departureTime");
        selectedTime = e.options[e.selectedIndex].text;
        }
        console.log(selectedTime);
        console.log("We're in getTime");
        console.log(data);
        var arr = createArray(2);

        const rows = data.split('\r\n');
        console.log("Selected time: ", selectedTime)
        for(let i = 0; i < rows.length; i++) {
            arr[i] = rows[i].split(',');
            console.log("arr line:", arr[i]);
        }
        for(let i = 0; i < rows.length; i++) {
            if(arr[i][0] == selectedTime) {
                console.log("hit if check")
                userTime = arr[i][1];
            }
        }
        console.log(userTime);

        if(direction == "east" && button == "arriving") {
            createEastArrive();
        } else if(direction == "east" && button == "departing") {
            createEastDepart();
        } else if(directoin == "west" && button == "arriving") {
            createWestArrive();
        } else {
            createWestDepart();
        }
}

async function loadLIRR(dayOfWeek) {
        if(dayOfWeek == "Sunday" || dayOfWeek == "Saturday") {
            var path = direction + "LIRRWeekend.csv";
            const response = await fetch(path);
            const data = await response.text();
            const rows = data.split('\r\n');
            const rows2 = rows.split('\n')
            for(let i = 0; i < rows2.length; i++) {
                LIRRcsv[i] = rows2[i].split(',');
            }

        } else if(dayOfWeek == "Friday") {
            var path = direction + "LIRRFriday.csv";
            const response = await fetch(path);
            const data = await response.text();
            const rows = data.split('\r\n');
            const rows2 = rows.split('\n')
            for(let i = 0; i < rows2.length; i++) {
                LIRRcsv[i] = rows2[i].split(',');
            }
        } else {
            var path = direction + "LIRRWeekday.csv";
            const response = await fetch(path);
            const data = await response.text();
            const rows = data.split('\r\n');
            const rows2 = rows.split('\n')
            for(let i = 0; i < rows2.length; i++) {
                LIRRcsv[i] = rows2[i].split(',');
            }
        }
    }

async function loadFerry() {
        var e = document.getElementById("destinations");
        var strDestination = e.options[e.selectedIndex].text;

        if(direction == "east") {
            console.log("hit east");
            const response = await fetch("to" + strDestination + ".csv");
            const data = await response.text();
            console.log(data);
            const rows = data.split('\r\n');
            console.log(rows)
            const rows2 = rows[0].split('\n');
            console.log(rows2);
            for(let i = 0; i < rows2.length; i++) {
                Ferrycsv[i] = rows2[i].split(',');
                console.log(Ferrycsv[i])
            }
        } else {
            const response = await fetch("from" + strDestination + ".csv");
            const data = await response.text();
            const rows = data.split('\r\n');
            for(let i = 0; i < rows.length; i++) {
                Ferrycsv[i] = rows[i].split(',');
            }
        }
        console.log(Ferrycsv)
    }

function createArray(length) {
        var arr = new Array(length || 0),
            i = length;
    
        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            while(i--) arr[length-1 - i] = createArray.apply(this, args);
        }
    
        return arr;
}

class Schedule {

    constructor(departTrain, arriveTrain, departFerry, date, time) {
        this.departTrain = departTrain;
        this.arriveTrain = arriveTrain;
        this.departFerry = departFerry;
        this.date = date;
        this.time = time;
    }
    
}

function createWestArrive() {
    console.log("Hit createWestArrive");


}

function createEastArrive() {

    console.log("Hit createEastArrive");
    var finalFerryTimes = [];
    var finalSchedules = [];

    var fDate = new Date();
    fDate.setHours(userTime.substring(0,2));
    fDate.setMinutes(userTime.substring(3,5));

    console.log(fDate);

    var tempDate = new Date();
    var col = 0;
    //console.log("day of week: " + dayOfTheWeek);
    for(var i = 0; i < Ferrycsv[0].length; i++) {
        if(Ferrycsv[0][i] == dayOfTheWeek) {
            col = i;
        }
    }
    console.log("col: " + col);
    console.log(Ferrycsv)
    for(var i = (Ferrycsv.length - 1); i > 0; i--) {
        var temp = Ferrycsv[i][col];
        if(temp != undefined) {
        tempDate.setHours(temp.substring(0,2));
        tempDate.setMinutes(temp.substring(3,5));
        console.log("tempDate: " + tempDate);
        console.log("i: " + i);
        if(tempDate <= fDate) {
            var difference = fDate - tempDate;
            console.log("difference: " + difference);
            if(difference < (91 * 60000)) {
            finalFerryTimes.push(Ferrycsv[i][col]);
            }
        }
        }
    } //end for loop to fill finalFerryTimes

    var dRow, aRow;
    console.log("Setting dRow, aRow. origin: " + origin);
    for(var  i = 0; i < LIRRcsv.length; i++) {
        if(LIRRcsv[i][0] == origin) {
            dRow = i;
        } else if(LIRRcsv[i][0] == "Sayville") {
            aRow = i;
        }
    }

    var finalTrainArriveTimes = [];
    var finalTrainDepartTimes = [];
    for(var i = 0; i < finalFerryTimes.length; i++) {
        var fDate2 = new Date();
        fDate2.setHours(finalFerryTimes[i].substring(0,2));
        fDate2.setMinutes(finalFerryTimes[i].substring(3,5)); 

        console.log(finalFerryTimes[i].substring(0,2));
        console.log(finalFerryTimes[i].substring(3,5));
        console.log(finalFerryTimes);
        fDate2.setTime(fDate2.getTime() - (30 * 60000));
        console.log("fdate2: " + fDate2.getHour + ":" + fDate2.getMinute);

        console.log("LIRRcsv len: " +  LIRRcsv[0].length);
        for(var j = LIRRcsv[0].length -1; j > 0; j--) {
          var temp = LIRRcsv[17][j];
          console.log("temp: "+ temp);
          tempDate.setHours(temp.substring(0,2));
          tempDate.setMinutes(temp.substring(3,5));
        if(tempDate <= fDate2) {
            var difference = fDate2 - tempDate;
            if(difference < (60 * 60000)) {
            finalTrainArriveTimes.push(LIRRcsv[aRow][j]);
            finalTrainDepartTimes.push(LIRRcsv[dRow][j]);
            console.log(LIRRcsv[1][j]);
            console.log(LIRRcsv[17][j]);

            var schedule = new Schedule(LIRRcsv[dRow][j], LIRRcsv[aRow][j],
                finalFerryTimes[i], document.getElementById("storeDate"), userTime);
            finalSchedules.push(schedule);
            }
        }
        }
    }

    //console.log(finalTrainArriveTimes);
    //console.log(finalTrainDepartTimes);

    //var finalSchedules = [];
    //for(var i = 0; i < finalTrainArriveTimes.length; i++) {
    //   for(var j = 0; j < finalFerryTimes.length; j++) {
    //    var schedule = new Schedule(finalTrainDepartTimes[j], finalTrainArriveTimes[j], 
    //        finalFerryTimes[i], document.getElementById("storeDate"), userTime);
    //    finalSchedules.push(schedule);
    //    }
    //}

    var e = document.getElementById("loader");
    e.classList.toggle('hidden');

    var element = document.getElementById("scheduleDisplay");

    for(var i = 0; i < finalSchedules.length; i++) {
    var para = document.createElement("p");
    var txt = document.createTextNode("Take LIRR from " + origin + " at " + finalSchedules[i].departTrain);
    para.appendChild(txt);
    element.appendChild(para);
    var para2 = document.createElement("p");
    txt = document.createTextNode("Make transfer at Babylon (as announced by conductor).");
    para2.appendChild(txt);
    element.appendChild(para2);
    var para3 = document.createElement("p");
    txt = document.createTextNode("Arrive at Sayville Train Station at " + finalSchedules[i].arriveTrain);
    para3.appendChild(txt);
    element.appendChild(para3);
    var para4 = document.createElement("p");
    txt = document.createTextNode("Take shuttle bus from Sayville to Sayville Ferrry Service terminal.");
    para4.appendChild(txt);
    element.appendChild(para4);
    var para5 = document.createElement("p");
    txt = document.createTextNode("Take " + destination + " ferry leaving at " + finalSchedules[i].departFerry);
    para5.appendChild(txt);
    element.appendChild(para5);
    var br = document.createElement("br");
    element.appendChild(br);
    element.appendChild(br);

    }

    element.classList.toggle("show");

}

function createWestDepart() {
    console.log("Hit createWestDepart");

    var finalFerryTimes = [];
    var finalSchedules = [];

    var fDate = new Date();
    fDate.setHours(userTime.substring(0,2));
    fDate.setMinutes(userTime.substring(3,5));

    console.log(fDate);

    var tempDate = new Date();
    var col = 0;
    //console.log("day of week: " + dayOfTheWeek);
    for(var i = 0; i < Ferrycsv[0].length; i++) {
        if(Ferrycsv[0][i] == dayOfTheWeek) {
            col = i;
        }
    }
    console.log("col: " + col);
    for(var i = 1; i < Ferrycsv.length; i++) {
        var temp = Ferrycsv[i][col];
        if(temp != undefined) {
        tempDate.setHours(temp.substring(0,2));
        tempDate.setMinutes(temp.substring(3,5));
        console.log("tempDate: " + tempDate);
        console.log("i: " + i);
        if(tempDate >= fDate) {
            var difference = fDate - tempDate;
            console.log("difference: " + difference);
            if(difference < (91 * 60000)) {
            finalFerryTimes.push(Ferrycsv[i][col]);
            }
        }
        }
    } //end for loop to fill finalFerryTimes

    //dRow = "depart row", where the train should leave
    //aRow = "arrive row", where the train should arrive
    var dRow, aRow;
    console.log("Setting dRow, aRow. depart: " + destination);
    for(var  i = 0; i < LIRRcsv.length; i++) {
        if(LIRRcsv[i][0] == "Sayville") {
            dRow = i;
        } else if(LIRRcsv[i][0] == destination) {
            aRow = i;
        }
    }

    var finalTrainArriveTimes = [];
    var finalTrainDepartTimes = [];
    for(var i = 0; i < finalFerryTimes.length; i++) {
        var fDate2 = new Date();
        fDate2.setHours(finalFerryTimes[i].substring(0,2));
        fDate2.setMinutes(finalFerryTimes[i].substring(3,5)); 

        console.log(finalFerryTimes[i].substring(0,2));
        console.log(finalFerryTimes[i].substring(3,5));
        console.log(finalFerryTimes);
        fDate2.setTime(fDate2.getTime() + (30 * 60000));
        console.log("fdate2: " + fDate2.getHour + ":" + fDate2.getMinute);

        console.log("LIRRcsv len: " +  LIRRcsv[0].length);
        for(var j = LIRRcsv[dRow].length -1; j > 0; j--) {
          var temp = LIRRcsv[dRow][j];
          console.log("temp: "+ temp);
          tempDate.setHours(temp.substring(0,2));
          tempDate.setMinutes(temp.substring(3,5));
        if(tempDate >= fDate2) {
            var difference = tempDate - fDate2;
            if(difference < (60 * 60000)) {
            finalTrainArriveTimes.push(LIRRcsv[aRow][j]);
            finalTrainDepartTimes.push(LIRRcsv[dRow][j]);

            var schedule = new Schedule(LIRRcsv[dRow][j], LIRRcsv[aRow][j],
                finalFerryTimes[i], document.getElementById("storeDate"), userTime);
            finalSchedules.push(schedule);
            }
        }
        }
    } // end loops to fill finalTrainTimes & finalSchedules

    var e = document.getElementById("loader");
    e.classList.toggle('hidden');

    var element = document.getElementById("scheduleDisplay");

    for(var i = 0; i < finalSchedules.length; i++) {
    var para = document.createElement("p");
    var txt = document.createTextNode("Take " + origin + " ferry leaving at " + finalSchedules[i].departFerry);
    para.appendChild(txt);
    element.appendChild(para);
    var para2 = document.createElement("p");
    txt = document.createTextNode("Take shuttle bus from the Sayville Ferrry Service terminal to the Sayville Train Station.");
    para2.appendChild(txt);
    element.appendChild(para2);
    var para3 = document.createElement("p");
    txt = document.createTextNode("Take the " + finalSchedules[i].departTrain + " train from Sayville.");
    para3.appendChild(txt);
    element.appendChild(para3);
    var para4 = document.createElement("p");
    txt = document.createTextNode("Make transfer at Babylon (as announced by conductor).");
    para4.appendChild(txt);
    element.appendChild(para4);
    var para5 = document.createElement("p");
    txt = document.createTextNode("Arrive at " + destination + " by " + finalSchedules[i].arriveTrain);
    para5.appendChild(txt);
    element.appendChild(para5);
    var br = document.createElement("br");
    element.appendChild(br);
    element.appendChild(br);

    }

    element.classList.toggle("show");
} //end createWestDepart()

function createEastDepart() {
    console.log("We're inside createEastDepart");

    var fDate = new Date();
    fDate.setHours(userTime.substring(0,2));
    fDate.setMinutes(userTime.substring(3,5));
    console.log(userTime.substring(0,2));
    console.log(userTime.substring(3,5));
    console.log("fDate: " + fDate);

    var tempDate = new Date();

    var finalTrainArriveTimes = [];
    var finalTrainDepartTimes = [];


    var dRow, aRow;
    for(var  i = 0; i < LIRRcsv.length; i++) {
        if(LIRRcsv[i][0] == origin) {
            dRow = i;
        } else if(LIRRcsv[i][0] == "Sayville") {
            aRow = i;
        }
    }

    for(var j = 1; j < LIRRcsv[dRow].length; j++) {
        var temp = LIRRcsv[dRow][j];
        console.log("temp: "+ temp);
        tempDate.setHours(temp.substring(0,2));
        tempDate.setMinutes(temp.substring(3,5));
        console.log("fDate: " + fDate);
        if(tempDate >= fDate) {
            var difference = tempDate - fDate;
            if(difference < (60 * 60000) && difference > 0) {
            finalTrainDepartTimes.push(LIRRcsv[dRow][j]);
            finalTrainArriveTimes.push(LIRRcsv[aRow][j]);
            console.log(LIRRcsv[dRow][j]);
            console.log(LIRRcsv[aRow][j]);
            }
        }
    } //End for to fill finalTrainTimes arrays

    var finalFerryTimes = [];
    var finalSchedules = [];

    var col2;
    for(var i = 0; i < Ferrycsv[0].length; i++) {
        if(Ferrycsv[0][i] == dayOfTheWeek) {
            col2 = i;
        }
    }

    for(var k = 0; k < finalTrainArriveTimes.length; k++) {
        var fDate2 = new Date();
        console.log(finalTrainArriveTimes[k]);
        fDate2.setHours(finalTrainArriveTimes[k].substring(0,2));
        fDate2.setMinutes(finalTrainArriveTimes[k].substring(3,5));
        fDate2.setTime(fDate2.getTime() + (30 * 60000));
        var l = 0;

        for(var i = 1; i < Ferrycsv.length; i++) {
            var temp2 = Ferrycsv[i][col2];
            console.log(Ferrycsv[i][col2]);
            if(temp2 != undefined) {
            tempDate.setHours(temp2.substring(0,2));
            tempDate.setMinutes(temp2.substring(3,5));
            console.log("i: " + i);
            console.log("tempDate: " + tempDate);
            console.log("fDate2: " + fDate2);
            console.log("difference: " + (tempDate - fDate2))
            if(tempDate >= fDate2) {
                var difference = tempDate - fDate2;
                console.log("difference: " + difference);
                if(difference < (121 * 60000) && difference > 0) {
                finalFerryTimes.push(Ferrycsv[i][col2]);
                
                var schedule = new Schedule(finalTrainDepartTimes[k], finalTrainArriveTimes[k],
                    finalFerryTimes[l], document.getElementById("storeDate"), userTime);
                finalSchedules.push(schedule);

                l++;
                }
            }
            }
        }
    } //end for loop to fill finalFerryTimes

    var e = document.getElementById("loader");
    e.classList.toggle('hidden');

    var element = document.getElementById("scheduleDisplay");

    for(var i = 0; i < finalSchedules.length; i++) {
    var para = document.createElement("p");
    var txt = document.createTextNode("Take LIRR from " + origin + " at " + finalSchedules[i].departTrain);
    para.appendChild(txt);
    element.appendChild(para);
    var para2 = document.createElement("p");
    txt = document.createTextNode("Make transfer at Babylon (as announced by conductor).");
    para2.appendChild(txt);
    element.appendChild(para2);
    var para3 = document.createElement("p");
    txt = document.createTextNode("Arrive at Sayville Train Station at " + finalSchedules[i].arriveTrain);
    para3.appendChild(txt);
    element.appendChild(para3);
    var para4 = document.createElement("p");
    txt = document.createTextNode("Take shuttle bus from Sayville to Sayville Ferrry Service terminal.");
    para4.appendChild(txt);
    element.appendChild(para4);
    var para5 = document.createElement("p");
    txt = document.createTextNode("Take " + destination + " ferry leaving at " + finalSchedules[i].departFerry);
    para5.appendChild(txt);
    element.appendChild(para5);
    var br = document.createElement("br");
    element.appendChild(br);
    element.appendChild(br);

    }

    element.classList.toggle("show");
} //end createEastDepart


function arriveSchedule() {

    clearPage();
    button = "arriving";
    getMTime();
    setTimeout(() => { userTime }, 1000);

    var date = document.getElementById("storeDate");
    var strDate = date.options[date.options.length - 1].text;
    console.log(strDate);
    var date2 = new Date(strDate);
    date2 = date2.getDay();

    console.log(userTime);

    var date3 = new Date(2021, 1, userTime);
    console.log(userTime);
}

function departSchedule() {
    console.log("Hit departSchedule!");
    clearPage();
    button = "departing";

    getMTime();
    setTimeout(() => { userTime }, 1000);

    var date = document.getElementById("storeDate");
    var strDate = date.options[date.options.length - 1].text;
    var date2 = new Date(strDate);
    date2 = date2.getDay();

}

